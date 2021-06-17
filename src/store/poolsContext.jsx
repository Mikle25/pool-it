import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { contractSavingPoolFactory, createSavingPool } from '../plugins/web3';
import handlerError from '../utils/errorsHandler';
import { useUserStateContext } from './userContext';
import useSavingPool from '../hooks/useSavingPool';
import useLoadingPools from '../hooks/useLoadingPools';

// State context
const PoolsStateContext = createContext(undefined);
PoolsStateContext.displayName = 'PoolsStateContext';
const usePoolsStateContext = () => {
  const context = useContext(PoolsStateContext);

  if (!context) {
    throw new Error(
      'usePoolsStateContext must be used within a PoolsStateContext',
    );
  }

  return context;
};

// Dispatch context
const PoolsDispatchContext = createContext(undefined);
PoolsDispatchContext.displayName = 'PoolsDispatchContext';
const usePoolsDispatchContext = () => {
  const context = useContext(PoolsDispatchContext);

  if (!context) {
    throw new Error(
      'usePoolsDispatchContext must be used within a PoolsDispatchContext',
    );
  }

  return context;
};

// Provider
const PoolsProvider = ({ children }) => {
  const { address } = useUserStateContext();
  const [poolsLength, setPoolsLength] = useState(0);
  const [isLoad, setLoad] = useState(true);
  const [dataPools, setDataPools] = useState([]);
  const [isUpdatePools, setUpdatePools] = useState(false);
  const { dataFromPool, claimPool } = useSavingPool(setUpdatePools);

  // Pools registry
  const registryLength = useCallback(async () => {
    const res = await contractSavingPoolFactory()
      .methods.userPoolsLength(address)
      .call();

    return res;
  }, [address]);
  const { getData, amountData } = useLoadingPools(registryLength);

  useEffect(() => {
    (async () => {
      try {
        const res = await registryLength();

        setPoolsLength(Number(res));
      } catch (e) {
        handlerError(e);
      }
    })();
  }, [isUpdatePools, registryLength, isUpdatePools]);

  useEffect(() => {
    (async () => {
      const arr = new Array(poolsLength)
        .fill(null)
        .map((_, index) => index)
        .reverse()
        .slice(0, amountData);

      try {
        setLoad(true);

        const awaitAllPools = await Promise.all(
          arr.map(async (_, index) => {
            const poolAddress = await contractSavingPoolFactory()
              .methods.userPool(address, index)
              .call();
            const res = await dataFromPool(poolAddress, index);
            return res;
          }),
        );

        setDataPools(awaitAllPools.filter((elem) => !elem.isLottery));
      } catch (e) {
        handlerError(e);
      } finally {
        setLoad(false);
      }
    })();

    return () => {
      setLoad(true);
      setDataPools([]);
    };
  }, [address, amountData, dataFromPool, poolsLength]);

  // Methods saving pool
  const createNewSavingPool = async (userAddress) => {
    try {
      await createSavingPool(userAddress);
      setUpdatePools(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const stateValue = useMemo(() => {
    return {
      dataPools,
      isLoad,
    };
  }, [dataPools, isLoad]);

  const stateDispatch = useMemo(() => {
    return {
      createNewSavingPool,
      claimPool,
      getData,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PoolsStateContext.Provider value={stateValue}>
      <PoolsDispatchContext.Provider value={stateDispatch}>
        {children}
      </PoolsDispatchContext.Provider>
    </PoolsStateContext.Provider>
  );
};

PoolsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { usePoolsDispatchContext, usePoolsStateContext, PoolsProvider };
