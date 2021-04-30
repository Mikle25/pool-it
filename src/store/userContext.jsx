import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';

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

const UserProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [isMetaMaskInstall, setMetaMaskInstall] = useState(null);
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    return setMetaMaskInstall(Boolean(ethereum && ethereum.isMetaMask));
  }, []);

  const isLoggedIn = useMemo(() => {
    return Boolean(address && address.length > 0);
  }, [address]);

  const connectAcc = async () => {
    const { ethereum } = window;
    try {
      const acc = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const bal = await web3.eth.getBalance(acc[0]);

      setAddress(acc[0]);
      setBalance(bal);
    } catch (e) {
      console.error(e);
    }
  };

  const updateAcc = async () => {
    try {
      const acc = await web3.eth.getAccounts();
      const bal = await web3.eth.getBalance(acc[0]);
      setAddress(acc[0]);
      setBalance(bal);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isMetaMaskInstall) {
      const { ethereum } = window;
      updateAcc();
      ethereum.on('accountsChanged', updateAcc);
    }
  });

  const stateValue = useMemo(() => {
    return {
      address,
      balance,
      isLoggedIn,
    };
  }, [address, isLoggedIn, balance]);

  const stateDispatch = useMemo(() => {
    return {
      connectAcc,
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
