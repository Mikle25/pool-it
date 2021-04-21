import React from 'react';
import styled from 'styled-components';
import bgContainerInfo from '../../../assets/img/bg-content2.png';
import { Text, Title } from '../../styled/Text';
import imgForInfo from '../../../assets/img/img-for-info.png';
import useThemeContext from '../../../hooks/useThemeContext';

const Info = styled.section`
  background: url(${({ bgImg }) => bgImg}) 100% 100% no-repeat;
  padding: 126px 217px 38px;
  background-size: contain;

  @media (${({ theme }) => theme.xlDown}) {
    height: auto;
    padding: 50px 25px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  grid-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    flex-direction: column;
    justify-content: start;
    height: auto;
  }
`;

const Img = styled.img`
  align-self: center;
  width: 400px;

  @media (${({ theme }) => theme.mdDown}) {
    width: 50%;
  }
`;

const Middle = () => {
  const theme = useThemeContext();
  return (
    <Info bgImg={bgContainerInfo}>
      <Title
        fs={theme.fs36}
        color={theme.darkBlue}
        style={{ marginBottom: '50px' }}
      >
        What Does It Do??
      </Title>

      <InfoWrapper>
        <Text fs={theme.fs28}>
          Pool it provides for the creation of public or private pools, where in
          these pools earn interest over time. The interest earned can then be
          distributed in any number of unique and creative ways, while the
          principal balance remains.
        </Text>

        <Img src={imgForInfo} alt="Img" />
      </InfoWrapper>
    </Info>
  );
};

export default Middle;
