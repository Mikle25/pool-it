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
  contractPool,
  createPoolLottery,
  getBalanceUSDT,
  approveAccount,
  setWinnerLottery,
  participationInLottery,
} from '../plugins/web3';

// Default value
const initialState = {
  poolInfo: undefined,
};

const initialDispatch = {
  setPoolInfo() {
    throw new Error('setPoolInfo() is not implemented');
  },
};

// State context
const ContractStateContext = createContext(initialState);
ContractStateContext.displayName = 'ContractStateContext';
const useContractStateContext = () => {
  const context = useContext(ContractStateContext);

  if (!context) {
    throw new Error(
      `useContractStateContext must be used within a ContractProvider`,
    );
  }
  return context;
};

// Dispatch context
const ContractDispatchContext = createContext(initialDispatch);
ContractDispatchContext.displayName = 'ContractDispatchContext';
const useContractDispatchContext = () => {
  const context = useContext(ContractDispatchContext);

  if (!context) {
    throw new Error(
      `useContractDispatchContext must be used within a ContractProvider`,
    );
  }
  return context;
};

// Provider
const ContractProvider = ({ children }) => {
  const { address, isMetaMaskInstall } = useUserStateContext();
  const [poolInfo, setPoolInfo] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [poolLength, setPoolLength] = useState(0);

  useEffect(() => {
    if (isMetaMaskInstall) {
      (async () => {
        const ownerContract = await contractPoolFactory.methods.owner().call();

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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await contractPoolFactory.methods.registryLength().call();
      setPoolLength(res);
    })();

    const infoPools = async (item) => {
      const poolAddress = await contractPoolFactory.methods
        .registry(item)
        .call();
      const getContract = await contractPool(poolAddress);

      const length = await contractPool(poolAddress)
        .methods.participantsLength()
        .call();

      console.log(`${poolAddress}: ${length}`);

      const balancePool = await getBalanceUSDT(poolAddress);
      const startDate = await getContract.methods.startDate().call();
      const participationEndDate = await getContract.methods
        .participationEndDate()
        .call();
      const endDate = await getContract.methods.endDate().call();
      const participationAmount = await getContract.methods
        .participationAmount()
        .call();
      const poolToken = await getContract.methods.poolToken().call();

      setPoolInfo((prev) => [
        ...prev,
        {
          id: item + 1,
          poolAddress,
          startDate,
          participationEndDate,
          endDate,
          participationAmount,
          poolToken,
          balancePool,
        },
      ]);
    };

    for (let i = 0; i < poolLength; i += 1) {
      infoPools(i);
    }
  }, [poolLength]);

  const playLottery = async (poolAddress, userAddress, participationAmount) => {
    await approveAccount(poolAddress, userAddress, participationAmount);

    await participationInLottery(poolAddress, userAddress);
  };

  const setWinner = async (poolAddress, userAddress) => {
    await setWinnerLottery(poolAddress, userAddress);
  };

  const stateValue = useMemo(() => {
    return {
      poolInfo,
      isAdmin,
    };
  }, [poolInfo, isAdmin]);

  const stateDispatch = useMemo(() => {
    return {
      setPoolInfo,
      createNewPool,
      playLottery,
      setWinner,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContractStateContext.Provider value={stateValue}>
      <ContractDispatchContext.Provider value={stateDispatch}>
        {children}
      </ContractDispatchContext.Provider>
    </ContractStateContext.Provider>
  );
};

ContractProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  ContractProvider,
  useContractStateContext,
  useContractDispatchContext,
};
