import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useUserStateContext } from './userContext';
import {
  contractPoolFactory,
  createPoolLottery,
  approveAccount,
  setWinnerLottery,
  participationInLottery,
  claim,
} from '../plugins/web3';
import usePool from '../hooks/usePool';

// State context
const LotteryStateContext = createContext(undefined);
LotteryStateContext.displayName = 'LotteryStateContext';
const useLotteryStateContext = () => {
  const context = useContext(LotteryStateContext);

  if (!context) {
    throw new Error(
      `useLotteryStateContext must be used within a LotteryProvider`,
    );
  }
  return context;
};

// Dispatch context
const LotteryDispatchContext = createContext(undefined);
LotteryDispatchContext.displayName = 'LotteryDispatchContext';
const useLotteryDispatchContext = () => {
  const context = useContext(LotteryDispatchContext);

  if (!context) {
    throw new Error(
      `useLotteryDispatchContext must be used within a LotteryProvider`,
    );
  }
  return context;
};

// Provider
const LotteryProvider = ({ children }) => {
  const { address, isMetaMaskInstall } = useUserStateContext();
  const [dataLottery, setDataLottery] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [poolsLength, setPoolsLength] = useState(0);
  const [isUpdatePools, setUpdatePools] = useState(false);
  const [isLoad, setLoad] = useState(true);
  const { dataFromPool } = usePool();

  useEffect(() => {
    if (isMetaMaskInstall) {
      (async () => {
        const ownerContract = await contractPoolFactory()
          .methods.owner()
          .call();

        setAdmin(ownerContract === address);
      })();
    }
  }, [address, isMetaMaskInstall]);

  const createNewPool = async (
    startDate,
    participationEndDate,
    endDate,
    poolCost,
    isLottery,
    ownerAddress,
  ) => {
    try {
      await createPoolLottery(
        startDate,
        participationEndDate,
        endDate,
        poolCost,
        isLottery,
        ownerAddress,
      );
      setUpdatePools(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const playLottery = async (poolAddress, userAddress, participationAmount) => {
    try {
      await approveAccount(poolAddress, userAddress, participationAmount);

      await participationInLottery(poolAddress, userAddress);
      setUpdatePools(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const setWinner = async (poolAddress, userAddress) => {
    try {
      await setWinnerLottery(poolAddress, userAddress);
      setUpdatePools(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const takeAmountWin = async (poolAddress, userAddress) => {
    try {
      await claim(poolAddress, userAddress);
      setUpdatePools(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatePools(false);
    }
  };

  useEffect(() => {
    setDataLottery([]);

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
  }, []);

  useEffect(() => {
    setDataLottery([]);

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

        setDataLottery(awaitAllPools.filter((elem) => elem.isLottery));
      } catch (e) {
        console.error(e);
      } finally {
        setLoad(false);
      }
    })();
  }, [poolsLength, isUpdatePools, dataFromPool]);

  const stateValue = useMemo(() => {
    return {
      dataLottery,
      isAdmin,
      poolsLength,
      isLoad,
    };
  }, [dataLottery, isAdmin, poolsLength, isLoad]);

  const stateDispatch = useMemo(() => {
    return {
      setDataLottery,
      createNewPool,
      playLottery,
      setWinner,
      takeAmountWin,
    };
  }, []);

  return (
    <LotteryStateContext.Provider value={stateValue}>
      <LotteryDispatchContext.Provider value={stateDispatch}>
        {children}
      </LotteryDispatchContext.Provider>
    </LotteryStateContext.Provider>
  );
};

LotteryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LotteryProvider, useLotteryStateContext, useLotteryDispatchContext };
