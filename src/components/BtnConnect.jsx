import React from 'react';
import { BtnWhite } from './styled/Btns';
import { useUserDispatchContext } from '../store/userContext';

const BtnConnect = () => {
  const { connect } = useUserDispatchContext();

  return (
    <>
      <BtnWhite onClick={connect}>Connect wallet</BtnWhite>
    </>
  );
};

export default BtnConnect;
