import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { balanceERC20, web3 } from '../plugins/web3';
import handlerError from '../utils/errorsHandler';

const { ethereum } = window;

// Default values
const initialState = {
  address: [],
};

const initialDispatch = {
  setAddress() {
    throw new Error('setAccounts() is not implemented');
  },
};

// State context
const UserStateContext = createContext(initialState);
UserStateContext.displayName = 'UserStateContext';
const useUserStateContext = () => {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error(`useUserStateContext must be used within a UserProvider`);
  }
  return context;
};

// Dispatch context
const UserDispatchContext = createContext(initialDispatch);
UserDispatchContext.displayName = 'UserDispatchContext';
const useUserDispatchContext = () => {
  const context = useContext(UserDispatchContext);

  if (!context) {
    throw new Error(
      `useUserDispatchContext must be used within a UserProvider`,
    );
  }
  return context;
};

// Provider
const UserProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balanceUSDT, setBalanceUSDT] = useState(0);

  const isMetaMaskInstall = useMemo(() => {
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  const isLoggedIn = useMemo(() => {
    return Boolean(address && address.length > 0);
  }, [address]);

  const connect = async () => {
    try {
      const acc = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAddress(acc[0]);
    } catch (e) {
      handlerError(e);
    }
  };

  const updateAcc = async () => {
    try {
      const acc = await web3.eth.getAccounts();
      const balance = await balanceERC20(acc[0]);

      setAddress(acc[0]);
      setBalanceUSDT(balance);
    } catch (e) {
      setAddress('');
      handlerError(e);
    }
  };

  useEffect(() => {
    if (isMetaMaskInstall) {
      updateAcc();
      ethereum.on('accountsChanged', updateAcc);

      // TODO select network for main network
      ethereum.on('chainChanged', (chain) => {
        if (chain !== '0x3') {
          toast.error('Wrong network');
        }
      });
    }
  });

  const stateValue = useMemo(() => {
    return {
      address,
      balanceUSDT,
      isLoggedIn,
      isMetaMaskInstall,
    };
  }, [address, balanceUSDT, isLoggedIn, isMetaMaskInstall]);

  const stateDispatch = useMemo(() => {
    return {
      connect,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserStateContext.Provider value={stateValue}>
      <UserDispatchContext.Provider value={stateDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, useUserStateContext, useUserDispatchContext };
