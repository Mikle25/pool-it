import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UserAccount from '../App/UserAccount';
import BtnConnect from '../BtnConnect';
import { useUserStateContext } from '../../store/userContext';
import LinkRout from '../styled/Links';

const StyledMenu = styled.nav`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.skyBlue};
  transform: ${({ open }) => (open ? 'translateY(0%)' : 'translateY(-125%)')};
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  row-gap: 2rem;
  z-index: 5;

  @media (${({ theme }) => theme.mdDown}) {
    width: 100%;
    display: flex;
  }
`;

const Menu = ({ open }) => {
  const { isLoggedIn, address } = useUserStateContext();

  return (
    <StyledMenu open={open}>
      {isLoggedIn ? (
        <>
          <UserAccount address={address} />
          <LinkRout to="/enter">Enter lottery</LinkRout>
        </>
      ) : (
        <BtnConnect />
      )}
      <LinkRout to="/pools">Pools</LinkRout>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: PropTypes.bool,
};

Menu.defaultProps = {
  open: false,
};

export default Menu;
