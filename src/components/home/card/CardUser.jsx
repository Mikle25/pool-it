import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../../styled/Card';
import { Text } from '../../styled/Text';
import { IconColor } from '../../styled/Icon';
import useThemeContext from '../../../hooks/useThemeContext';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: ${({ theme }) => theme.borderBlue};
  padding: 0 20px;
`;

const CardUser = ({ text, color, bgColor }) => {
  const theme = useThemeContext();

  return (
    <Container w="220px" h="175px" bgColor={bgColor || theme.white}>
      <IconColor
        icon="user-friends"
        size="3x"
        color={color}
        style={{ marginBottom: '20px' }}
      />
      <Text color={color}>{text}</Text>
    </Container>
  );
};

CardUser.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

CardUser.defaultProps = {
  text: '',
  color: '',
  bgColor: '',
};

export default CardUser;
