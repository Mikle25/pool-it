import React from 'react';
import styled from 'styled-components';
import { Title } from '../../styled/Text';
import useThemeContext from '../../../hooks/useThemeContext';
import CardRates from '../card/CardRates';

const InfoBlockWrapper = styled.section`
  padding: 86px 217px;
  width: 100%;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 50px 25px 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  grid-gap: 5vw;

  @media (${({ theme }) => theme.xlDown}) {
    height: 100%;
    flex-wrap: wrap;
  }
`;

const Footer = () => {
  const theme = useThemeContext();

  return (
    <InfoBlockWrapper>
      <Title
        fs={theme.fs36}
        color={theme.darkBlue}
        style={{ marginBottom: '76px' }}
      >
        How Does It Do??
      </Title>

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
    </InfoBlockWrapper>
  );
};

export default Footer;
