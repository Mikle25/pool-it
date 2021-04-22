import React from 'react';
import styled from 'styled-components';
import bgContainerInfo from '../../../assets/img/bg-content2.png';
import { Text, SubTitle } from '../../styled/Text';
import imgForInfo from '../../../assets/img/img-for-info.png';
import useThemeContext from '../../../hooks/useThemeContext';

const Info = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ bgImg }) => bgImg}) 100% 100% no-repeat;
  padding: 0 14vw;
  background-size: contain;
  min-height: 680px;
  column-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    flex-wrap: wrap;
    padding: 5vw;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  @media (${({ theme }) => theme.smDown}) {
    width: 100%;
  }
`;

const Middle = () => {
  const theme = useThemeContext();
  return (
    <Info bgImg={bgContainerInfo}>
      <InfoWrapper>
        <SubTitle
          fs={theme.fs36}
          color={theme.darkBlue}
          style={{ marginBottom: '50px' }}
        >
          What Does It Do??
        </SubTitle>

        <Text fs={theme.fs28}>
          Pool it provides for the creation of public or private pools, where in
          these pools earn interest over time. The interest earned can then be
          distributed in any number of unique and creative ways, while the
          principal balance remains.
        </Text>
      </InfoWrapper>

      <Img src={imgForInfo} alt="Img" />
    </Info>
  );
};

export default Middle;
