import React from 'react';
import styled from 'styled-components';
import bgMain from '../../assets/img/bg-main-page.png';
import { Title } from '../styled/Text';
import { BtnBig, BtnBigSkyBlue } from '../styled/Btn';
import useThemeContext from '../../hooks/useThemeContext';
import { BtnWrapper } from '../styled/Wrappers';

const ContainerHeader = styled.section`
  display: flex;
  align-items: flex-end;
  background: url(${bgMain}) right no-repeat;
  background-size: cover;
  padding: 170px 14vw 3vw;
  row-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 170px 5vw 5vh;
    row-gap: 15vh;
  }
`;

const Container = styled.div`
  max-width: 725px;
  display: flex;
  flex-direction: column;
  row-gap: 60px;

  @media (${({ theme }) => theme.mdDown}) {
    width: auto;
  }
`;

const Header = () => {
  const theme = useThemeContext();

  return (
    <ContainerHeader>
      <Container>
        <Title>
          Platform for the pooling and distribution of digital assets
        </Title>

        <BtnWrapper>
          <BtnBig fs={theme.fs32}>Start pool</BtnBig>
          <BtnBigSkyBlue fs={theme.fs32}>Find out more</BtnBigSkyBlue>
        </BtnWrapper>
      </Container>
    </ContainerHeader>
  );
};

export default Header;
