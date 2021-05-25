import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import bgMain from '../../assets/img/bg-main-page.png';
import { Title } from '../styled/Text';
import { BtnBig } from '../styled/Btn';
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
  row-gap: 150px;

  @media (${({ theme }) => theme.mdDown}) {
    width: auto;
    row-gap: 100px;
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
          <Link to="/pools">
            <BtnBig fs={theme.fs24}>View pool</BtnBig>
          </Link>
        </BtnWrapper>
      </Container>
    </ContainerHeader>
  );
};

export default Header;
