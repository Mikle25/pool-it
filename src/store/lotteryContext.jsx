import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useUserStateContext } from './userContext';
import {
  contractLotteryPoolFactory,
  createLotteryPool,
  setWinnerLottery,
  claim,
  approveAccount,
  participationInLottery,
  contractLotteryPool,
} from '../plugins/web3';
import handlerError from '../utils/errorsHandler';
import useLoadingPools from '../hooks/useLoadingPools';

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
  const { getData, amountData } = useLoadingPools();

  useEffect(() => {
    if (isMetaMaskInstall) {
      (async () => {
        const ownerContract = await contractLotteryPoolFactory()
          .methods.owner()
          .call();

        setAdmin(ownerContract === address);
      })();
    }
  }, [address, isMetaMaskInstall]);

  const dataFromPool = useCallback(async (poolAddress, index) => {
    try {
      const getContract = await contractLotteryPool(poolAddress);

      const isLottery = await getContract.methods.isLottery().call();

      const winner = await contractLotteryPool(poolAddress)
        .methods.winner()
        .call();
      const liquidated = await contractLotteryPool(poolAddress)
        .methods.liquidated()
        .call();

      const balancePool = await contractLotteryPool(poolAddress)
        .methods.poolBalance()
        .call();
      const startDate = await getContract.methods.startDate().call();
      const participationEndDate = await getContract.methods
        .participationEndDate()
        .call();
      const endDate = await getContract.methods.endDate().call();
      const participationAmount = await getContract.methods
        .participationAmount()
        .call();
      const poolToken = await getContract.methods.poolToken().call();

      return {
        id: index + 1,
        poolAddress,
        startDate,
        participationEndDate,
        endDate,
        participationAmount,
        poolToken,
        balancePool,
        liquidated,
        winner,
        isLottery,
      };
    } catch (e) {
      handlerError(e);
    }

    return [];
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await contractLotteryPoolFactory()
          .methods.registryLength()
          .call();
        setPoolsLength(Number(res));
        if (Number(res) > 0) {
          setPoolsLength(Number(res));
        } else {
          setPoolsLength(0);
        }
      } catch (e) {
        handlerError(e);
      }
    })();
  }, [isUpdatePools]);

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
          arr.map(async (num, index) => {
            const poolAddress = await contractLotteryPoolFactory()
              .methods.registry(num)
              .call();
            const res = await dataFromPool(poolAddress, index);
            return res;
          }),
        );

        setDataLottery(awaitAllPools);
      } catch (e) {
        handlerError(e);
      } finally {
        setLoad(false);
      }
    })();

    return () => {
      setLoad(false);
      setDataLottery([]);
    };
  }, [poolsLength, isUpdatePools, dataFromPool, amountData]);

  // Methods lottery pool
  const createNewPool = async (
    startDate,
    participationEndDate,
    endDate,
    poolCost,
    isLottery,
  ) => {
    try {
      await createLotteryPool(
        startDate,
        participationEndDate,
        endDate,
        poolCost,
        isLottery,
        address,
      );
      setUpdatePools(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const playLottery = async (poolAddress, participationAmount) => {
    try {
      await approveAccount(poolAddress, address, participationAmount);

      await participationInLottery(poolAddress, address);
      setUpdatePools(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const setWinner = async (poolAddress) => {
    try {
      await setWinnerLottery(poolAddress, address);
      setUpdatePools(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePools(false);
    }
  };

  const takeAmountWin = async (poolAddress) => {
    try {
      await claim(poolAddress, address);
      setUpdatePools(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePools(false);
    }
  };

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
      getData,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
