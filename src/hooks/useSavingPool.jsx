import { useCallback } from 'react';
import {
  approveAccount,
  claimSavingPool,
  contractSavingPool,
  participationSavingPool,
} from '../plugins/web3';
import handlerError from '../utils/errorsHandler';

const useSavingPool = (currentAddress, isLoggedIn) => {
  const dataFromPool = useCallback(async (poolAddress, index = 0) => {
    try {
      const getContract = await contractSavingPool(poolAddress);

      const balancePool = await getContract.methods.poolBalance().call();
      const poolToken = await getContract.methods.poolToken().call();
      const beneficiary = await getContract.methods.beneficiary().call();
      const participantsLength = await getContract.methods
        .participantsLength()
        .call();

      return {
        id: index + 1,
        poolAddress,
        poolToken,
        balancePool,
        beneficiary,
        participantsLength,
      };
    } catch (e) {
      handlerError(e);
    }

    return [];
  }, []);

  const participate = async (poolAddress, amount) => {
    if (!isLoggedIn) return;

    try {
      await approveAccount(poolAddress, currentAddress, amount);
      await participationSavingPool(currentAddress, poolAddress, amount);
    } catch (e) {
      handlerError(e);
    }
  };

  const claimPool = async (poolAddress) => {
    try {
      await claimSavingPool(poolAddress, currentAddress);
    } catch (e) {
      handlerError(e);
    }
  };

  return { dataFromPool, participate, claimPool };
};

export default useSavingPool;
