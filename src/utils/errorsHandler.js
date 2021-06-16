import { toast } from 'react-toastify';

const isMetaMaskInstall = window.ethereum.isMetaMask;

const ErrorMsg = {
  [-32002]: 'Wallet request permission sent',
  4001: 'User denied transaction signature',
};

const handlerError = (err) => {
  // eslint-disable-next-line no-console
  console.error(err);

  if (!isMetaMaskInstall) {
    return toast.error('Install the MetaMask extension');
  }

  const { code } = err;
  const errorText = ErrorMsg[code];

  return toast.error(errorText);
};

export default handlerError;
