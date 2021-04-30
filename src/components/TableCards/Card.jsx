import React from 'react';
import PropTypes from 'prop-types';
import TblCards from '../styled/TblCards';

const Card = ({ row, content }) => {
  return <TblCards.Card>{content(row)}</TblCards.Card>;
};

Card.propTypes = {
  row: PropTypes.objectOf(PropTypes.any).isRequired,
  content: PropTypes.func,
};

Card.defaultProps = {
  content: () => null,
};

export default Card;
