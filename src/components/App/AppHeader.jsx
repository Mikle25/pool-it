import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import { Btn } from '../styled/Btn';
import { FlexJustifyBetween } from '../styled/Flex';

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
  width: 500px;
  max-width: 500px;
`;

const AppHeader = () => {
  return (
    <Header>
      <NavLink to="/">
        <img src={logo} alt="Pool It" />
      </NavLink>

      <FlexContainer>
        <Btn>Pools</Btn>
        <Btn variant="primary">Connect wallet</Btn>
      </FlexContainer>
    </Header>
  );
};

export default AppHeader;
