import { useState } from 'react';

const useLoadingPools = (registryLength) => {
  const [amountData, setAmountData] = useState(4);

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
