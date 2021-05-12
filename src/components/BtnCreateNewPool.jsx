import React from 'react';
import { BtnWhite } from './styled/Btn';
import {
  useContractStateContext,
  useContractDispatchContext,
} from '../store/contractContext';

const startDate = Math.round(new Date(2021, 4, 11).getTime() / 1000);
const participationEndDate = Math.round(new Date(2021, 4, 12).getTime() / 1000);
const endDate = Math.round(new Date(2021, 4, 13).getTime() / 1000);
const poolCost = 10000;

const BtnCreateNewPool = () => {
  const { contractInfo } = useContractStateContext();
  const { createNewPool } = useContractDispatchContext();

  console.log(contractInfo);

  const handlerCreatePool = () => {
    createNewPool(startDate, participationEndDate, endDate, poolCost);
  };

  return (
    <>
      <BtnWhite onClick={handlerCreatePool}>Create new pools</BtnWhite>
    </>
  );
};

export default BtnCreateNewPool;
