import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connectAcc, getAccount } from '../plugins/web3';

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
  const [isMetaMaskInstall, setMetaMaskInstall] = useState(null);

  useEffect(() => {
    return setMetaMaskInstall(Boolean(ethereum && ethereum.isMetaMask));
  }, []);

  const isLoggedIn = useMemo(() => {
    return Boolean(address && address.length > 0);
  }, [address]);

  const connect = async () => {
    try {
      const acc = await connectAcc();

      setAddress(acc[0]);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const updateAcc = async () => {
    try {
      const acc = await getAccount();

      setAddress(acc[0]);
    } catch (e) {
      setAddress('');
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (isMetaMaskInstall) {
      ethereum.on('accountsChanged', updateAcc);
      updateAcc();
    }
  });

  const stateValue = useMemo(() => {
    return {
      address,
      isLoggedIn,
      isMetaMaskInstall,
    };
  }, [address, isLoggedIn, isMetaMaskInstall]);

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
