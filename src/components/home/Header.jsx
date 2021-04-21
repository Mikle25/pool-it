import React from 'react';
import styled from 'styled-components';
import AppHeader from '../App/AppHeader';
import bgMain from '../../assets/img/bg-main-page.png';
import { Title } from '../styled/Text';
import { BtnMoreInfo } from '../styled/Btn';
import useThemeContext from '../../hooks/useThemeContext';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 650px;
  background: url(${bgMain}) 100% no-repeat;
  background-size: cover;
  padding: 50px 210px;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 50px 25px;
  }
`;

const TitleWrap = styled.div`
  max-width: 670px;
`;

const Header = () => {
  const theme = useThemeContext();

  return (
    <Container>
      <div className="fixed-top">
        <AppHeader />
      </div>

      <TitleWrap>
        <Title>
          Platform for the pooling and distribution of digital assets
        </Title>
      </TitleWrap>

      <BtnMoreInfo bg={theme.blue} color={theme.white} fs={theme.fs32}>
        Find out more
      </BtnMoreInfo>
    </Container>
  );
};

export default Header;
