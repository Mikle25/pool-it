import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import TblCards from '../styled/TblCards';
import useThemeContext from '../../hooks/useThemeContext';

const BtnArrow = styled(Button)`
  border-radius: 50%;
  background-color: white;
  border: 1px solid transparent;

  &:hover,
  &:focus,
  &:not(:disabled):not(.disabled):active {
    background-color: white;
    border: 1px solid ${({ theme }) => theme.blue};
  }
`;

const TableCards = ({ rows, rowKey, maxHeight, content }) => {
  const theme = useThemeContext();

  return (
    <>
      <TblCards style={{ overflowY: 'scroll' }} maxHeight={maxHeight}>
        {rows.map((row) => (
          <TblCards.Card key={row[rowKey]}>{content(row)}</TblCards.Card>
        ))}
      </TblCards>

      <BtnArrow>
        <FontAwesomeIcon
          icon="chevron-down"
          color={theme.blue}
          style={{ verticalAlign: 'middle' }}
        />
      </BtnArrow>
    </>
  );
};

TableCards.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string.isRequired,
  maxHeight: PropTypes.string,
  content: PropTypes.func.isRequired,
};

TableCards.defaultProps = {
  maxHeight: '100%',
};

export default TableCards;
