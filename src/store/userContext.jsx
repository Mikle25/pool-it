import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connectAcc, getAccBalance, getAccount, web3 } from '../plugins/web3';

const { ethereum } = window;

// Default values
const initialState = {
  address: [],
  balance: null,
};

const initialDispatch = {
  setAddress() {
    throw new Error('setAccounts() is not implemented');
  },
  setBalance() {
    throw new Error('setBalance() is not implemented');
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
  const [balance, setBalance] = useState(null);
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
      const bal = await getAccBalance(acc[0]);

      setAddress(acc[0]);
      setBalance(bal);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    if (isMetaMaskInstall) {
      const updateAcc = async () => {
        try {
          const acc = await getAccount();
          const bal = await getAccBalance(acc[0]);
          const convertBal = await web3.utils.fromWei(bal, 'ether');

          setAddress(acc[0]);
          setBalance(convertBal);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      };
      ethereum.on('accountsChanged', updateAcc);
      updateAcc();
    }
  });

  const stateValue = useMemo(() => {
    return {
      address,
      balance,
      isLoggedIn,
      isMetaMaskInstall,
    };
  }, [address, isLoggedIn, balance, isMetaMaskInstall]);

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
