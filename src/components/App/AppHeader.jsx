import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import { BtnWhite } from '../styled/Btn';
import { FlexJustifyBetween } from '../styled/Flex';
import {
  useUserDispatchContext,
  useUserStateContext,
} from '../../store/userContext';
import UserAccount from './UserAccount';

const Header = styled.header`
  position: absolute;
  top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 14vw;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 0 5vw;
  }
`;

const FlexContainer = styled(FlexJustifyBetween)`
  align-items: center;
  width: 500px;
  max-width: 500px;
`;

const AppHeader = () => {
  const { connectAcc } = useUserDispatchContext();
  const { isLoggedIn, address } = useUserStateContext();

  return (
    <Header>
      <NavLink to="/">
        <img src={logo} alt="Pool It" />
      </NavLink>

      <FlexContainer>
        <NavLink to="/">Pools</NavLink>
        {isLoggedIn ? (
          <UserAccount address={address} />
        ) : (
          <BtnWhite onClick={connectAcc}>Connect wallet</BtnWhite>
        )}
      </FlexContainer>
    </Header>
  );
};

export default AppHeader;
