import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';
import BtnLink from '../styled/BtnLink';
import { Btn } from '../styled/Btn';
import { FlexJustifyBetween } from '../styled/Flex';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FlexContainer = styled(FlexJustifyBetween)`
  width: 500px;
  max-width: 500px;
`;

const AppHeader = () => {
  return (
    <Header>
      <NavLink to="/">
        <img src={logo} alt="Pool It" width={150} />
      </NavLink>

      <FlexContainer>
        <BtnLink>Pools</BtnLink>
        <Btn variant="primary">Connect wallet</Btn>
      </FlexContainer>
    </Header>
  );
};

export default AppHeader;
