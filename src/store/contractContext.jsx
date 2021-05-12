import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useUserStateContext } from './userContext';
import {
  contract,
  getContract,
  infoPool,
  allTransaction,
} from '../plugins/web3';

// Default value
const initialState = {
  contractInfo: undefined,
};

const initialDispatch = {
  setContractInfo() {
    throw new Error('setContractInfo() is not implemented');
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
  const [contractInfo, setContractInfo] = useState('');
  const { address } = useUserStateContext();

  console.log(contract);
  console.log(getContract);
  infoPool(address);
  allTransaction(address);

  const createNewPool = async (
    startDate,
    participationEndDate,
    endDate,
    poolCost,
  ) => {
    try {
      const pool = await contract.methods
        .createPool(startDate, participationEndDate, endDate, poolCost)
        .send({ from: address });

      setContractInfo(pool);
    } catch (e) {
      console.error(e);
    }
  };

  const stateValue = useMemo(() => {
    return {
      contractInfo,
    };
  }, [contractInfo]);

  const stateDispatch = useMemo(() => {
    return {
      setContractInfo,
      createNewPool,
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
