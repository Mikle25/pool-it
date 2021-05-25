import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  // approveAccount,
  contractPoolFactory,
  // participationInLottery,
} from '../plugins/web3';
import usePool from '../hooks/usePool';

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
  const [poolsLength, setPoolsLength] = useState(0);
  const [isLoad, setLoad] = useState(false);
  const [dataPools, setDataPools] = useState([]);
  const { dataFromPool, isUpdatePools, participation } = usePool();

  useEffect(() => {
    setDataPools([]);

    (async () => {
      try {
        const res = await contractPoolFactory().methods.registryLength().call();
        if (Number(res) > 0) {
          setPoolsLength(Number(res));
        } else {
          setPoolsLength(0);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [isUpdatePools]);

  useEffect(() => {
    setDataPools([]);

    (async () => {
      const arr = new Array(poolsLength)
        .fill(null)
        .map((elem, index) => index)
        .reverse();

      try {
        setLoad(true);

        const awaitAllPools = await Promise.all(
          arr.map(async (num, index) => {
            const res = await dataFromPool(num, index);
            return res;
          }),
        );

        setDataPools(awaitAllPools.filter((elem) => !elem.isLottery));
      } catch (e) {
        console.error(e);
      } finally {
        setLoad(false);
      }
    })();
  }, [dataFromPool, poolsLength, isUpdatePools]);

  const stateValue = useMemo(() => {
    return {
      dataPools,
      isLoad,
    };
  }, [dataPools, isLoad]);

  const stateDispatch = useMemo(() => {
    return {
      participation,
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
