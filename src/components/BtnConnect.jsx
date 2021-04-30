import React from 'react';
import { BtnWhite } from './styled/Btn';
import { useUserDispatchContext } from '../store/userContext';

const BtnConnect = () => {
  const { connectAcc } = useUserDispatchContext();

  return (
    <>
      <BtnWhite onClick={connectAcc}>Connect wallet</BtnWhite>
    </>
  );
};

export default BtnConnect;
