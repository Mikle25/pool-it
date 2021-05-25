import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import { FlexJustifyBetween } from '../styled/Flex';
import { useUserStateContext } from '../../store/userContext';
import UserAccount from './UserAccount';
import BtnConnect from '../BtnConnect';
import Burger from '../burger-menu/Burger';
import Menu from '../burger-menu/Menu';
import LinkRout from '../styled/Links';

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
  gap: 10vw;

  @media (${({ theme }) => theme.lgDown}) {
    display: none;
  }
`;

const BurgerMenu = styled.div`
  display: none;
  @media (${({ theme }) => theme.lgDown}) {
    display: block;
  }
`;

const AppHeader = () => {
  const { isLoggedIn, address } = useUserStateContext();
  const [open, setOpen] = useState(false);

  return (
    <Header>
      <NavLink to="/">
        <img src={logo} alt="Pool It" />
      </NavLink>

      <FlexContainer>
        <LinkRout to="/pools">Pools</LinkRout>

        {isLoggedIn ? <UserAccount address={address} /> : <BtnConnect />}
      </FlexContainer>

      <BurgerMenu>
        <Burger open={open} setOpen={setOpen} />
      </BurgerMenu>

      <Menu open={open} setOpen={setOpen} />
    </Header>
  );
};

export default AppHeader;
