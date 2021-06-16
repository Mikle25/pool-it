import React, {
  createContext,
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
  const { dataFromPool, claimPool } = useSavingPool(address);

  useEffect(() => {
    (async () => {
      try {
        const res = await contractSavingPoolFactory()
          .methods.userPoolsLength(address)
          .call();

        if (Number(res) > 0) {
          setPoolsLength(Number(res));
        } else {
          setPoolsLength(0);
        }
      } catch (e) {
        handlerError(e);
      }
    })();
  }, [address, isUpdatePools]);

  useEffect(() => {
    (async () => {
      const arr = new Array(poolsLength)
        .fill(null)
        .map((_, index) => index)
        .reverse()
        .slice(0, 4);

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
  }, [address, dataFromPool, poolsLength]);

  // Methods saving pool
  const createNewSavingPool = async () => {
    try {
      await createSavingPool(address);
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
