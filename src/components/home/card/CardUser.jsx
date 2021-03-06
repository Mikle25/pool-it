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
  border: ${({ theme, borderColor }) => theme.borderBlue(borderColor)};
  padding: 0 20px;
`;

const CardUser = ({ text, color, bg }) => {
  const theme = useThemeContext();

  return (
    <Container
      w="220px"
      h="175px"
      bg={bg || theme.white}
      borderColor={bg || theme.lightBlue}
    >
      <IconColor
        icon="user-friends"
        size="3x"
        color={color}
        style={{ marginBottom: '20px' }}
      />
      <Text color={color || theme.blue}>{text}</Text>
    </Container>
  );
};

CardUser.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  bg: PropTypes.string,
};

CardUser.defaultProps = {
  text: '',
  color: '',
  bg: '',
};

export default CardUser;
