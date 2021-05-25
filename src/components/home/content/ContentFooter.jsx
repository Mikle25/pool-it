import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../styled/Text';
import CardRates from '../card/CardRates';
import { BtnBig, BtnBigSkyBlue } from '../../styled/Btn';
import useThemeContext from '../../../hooks/useThemeContext';
import { BtnWrapper } from '../../styled/Wrappers';

const InfoBlockWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 86px 14vw;
  width: 100%;
  row-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 5vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  gap: 3rem;

  @media (${({ theme }) => theme.lgDown}) {
    height: 100%;
    flex-wrap: wrap;
  }
`;

const ContentFooter = () => {
  const theme = useThemeContext();

  return (
    <InfoBlockWrapper>
      <SubTitle>How Does It Do?</SubTitle>

      <Wrapper>
        <CardRates
          title="Interest rates"
          text="Proof of stake blockchains offer much higher interest rates than
            traditional banks."
        />

        <CardRates
          title="Instant access"
          text=" Blockchain technology allows for near instant access to said
            interest - a paradigm shift in how we utilize our assets, and a
            fundamental shift in the financial system as whole."
        />

        <CardRates
          title="Highest rate of return"
          text="Poolit will access the lending protocols of compound finance to
            provide the highest rate of return possible in the current DEFI
            environment."
        />
      </Wrapper>

      <BtnWrapper>
        <BtnBig fs={theme.fs24}>Create savings pool</BtnBig>
        <BtnBigSkyBlue fs={theme.fs24}>Join lottery pool</BtnBigSkyBlue>
      </BtnWrapper>
    </InfoBlockWrapper>
  );
};

export default ContentFooter;
