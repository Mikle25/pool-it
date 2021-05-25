import React from 'react';
import { BtnWhite } from './styled/Btn';
import { useUserStateContext } from '../store/userContext';

const BtnCreateSavingsPool = () => {
  const { isLoggedIn } = useUserStateContext();

  const handlerCreatePool = () => {
    if (!isLoggedIn) {
      alert('Connect to metamask');
    }
  };

  return (
    <>
      <BtnWhite onClick={handlerCreatePool}>Create new pools</BtnWhite>
    </>
  );
};

export default BtnCreateSavingsPool;
