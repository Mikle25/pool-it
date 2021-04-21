import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../../styled/Card';
import { Text, SubTitle } from '../../styled/Text';
import useThemeContext from '../../../hooks/useThemeContext';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.white};
  padding: 24px 80px;
  min-width: 300px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.borderShadow};

  @media (${({ theme }) => theme.xlDown}) {
    padding: 10px;
  }
`;

const CardInfo = ({ title, text }) => {
  const theme = useThemeContext();

  return (
    <Container w="50%" h="160px">
      <SubTitle color={theme.darkBlue} fs={theme.fs24} fw="600">
        {title}
      </SubTitle>

      {text && <Text style={{ marginTop: '20px' }}>{text}</Text>}
    </Container>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

CardInfo.defaultProps = {
  title: '',
  text: '',
};

export default CardInfo;
