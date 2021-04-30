import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, SubTitle } from '../../styled/Text';
import useThemeContext from '../../../hooks/useThemeContext';

const Card = styled.div`
  background: white;
  border-radius: 30px;
  border: ${({ theme }) => theme.borderSkyBlue};
  flex: 0 0 275px;
  height: 280px;
  padding: 15px;

  &:nth-child(2) {
    align-self: center;
  }

  &:last-child {
    align-self: flex-end;
  }
`;

const CardRates = ({ title, text }) => {
  const theme = useThemeContext();

  return (
    <Card>
      <SubTitle
        fs={theme.fs24}
        color={theme.purple}
        style={{ marginBottom: '20px' }}
      >
        {title}
      </SubTitle>

      <Text>{text}</Text>
    </Card>
  );
};

CardRates.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

CardRates.defaultProps = {
  title: '',
  text: '',
};

export default CardRates;
