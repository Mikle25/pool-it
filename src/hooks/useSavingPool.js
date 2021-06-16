import { useCallback } from 'react';
import {
  approveAccount,
  claimSavingPool,
  contractSavingPool,
  participationSavingPool,
} from '../plugins/web3';
import handlerError from '../utils/errorsHandler';

const useSavingPool = (setUpdatePool) => {
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

  const participate = async (poolAddress, address, amount) => {
    try {
      await approveAccount(poolAddress, address, amount);
      await participationSavingPool(address, poolAddress, amount);
      setUpdatePool(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePool(false);
    }
  };

  const claimPool = async (poolAddress, address) => {
    try {
      await claimSavingPool(poolAddress, address);
      setUpdatePool(true);
    } catch (e) {
      handlerError(e);
    } finally {
      setUpdatePool(false);
    }
  };

  return { dataFromPool, participate, claimPool };
};

export default useSavingPool;
