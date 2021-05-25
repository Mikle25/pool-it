import { useCallback, useState } from 'react';
import {
  approveAccount,
  contractPool,
  contractPoolFactory,
  getBalanceUSDT,
  participationInLottery,
} from '../plugins/web3';

const usePool = () => {
  const [isUpdatePools, setUpdatePools] = useState(false);

  const dataFromPool = useCallback(async (num, index) => {
    try {
      const poolAddress = await contractPoolFactory()
        .methods.registry(num)
        .call();
      const getContract = await contractPool(poolAddress);

      const isLottery = await getContract.methods.isLottery().call();

      const winner = await contractPool(poolAddress).methods.winner().call();
      const liquidated = await contractPool(poolAddress)
        .methods.liquidated()
        .call();

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
      console.error(e);
    }

    return [];
  }, []);

  const participation = async (
    poolAddress,
    userAddress,
    participationAmount,
  ) => {
    try {
      await approveAccount(poolAddress, userAddress, participationAmount);

      await participationInLottery(poolAddress, userAddress);
      setUpdatePools(true);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatePools(false);
    }
  };

  return {
    dataFromPool,
    participation,
    isUpdatePools,
  };
};

export default usePool;
