import { useCallback, useState } from 'react';
import { contractLotteryPoolFactory } from '../plugins/web3';

const useLoadingPools = () => {
  const [amountData, setAmountData] = useState(4);

  const registryLength = useCallback(async () => {
    const res = await contractLotteryPoolFactory()
      .methods.registryLength()
      .call();
    return res;
  }, []);

  const getData = async () => {
    const resp = await registryLength();
    setAmountData((val) => {
      if (resp > amountData) {
        return val + 4;
      }

      return resp;
    });
  };

  return { getData, amountData };
};

export default useLoadingPools;
