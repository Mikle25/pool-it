import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { BtnWhite } from './styled/Btns';

const ButtonBack = styled(BtnWhite)`
  width: max-content;
  font-weight: 700;

  &:hover {
    text-decoration: none;
  }
`;

const BtnBack = () => {
  return (
    <ButtonBack as={Link} to="/pools">
      <FontAwesomeIcon icon="arrow-left" style={{ marginRight: '10px' }} />
      Back
    </ButtonBack>
  );
};

export default BtnBack;
