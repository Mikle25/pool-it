import React from 'react';
import styled from 'styled-components';
import bgContainerCard from '../../../assets/img/bg-content1.png';
import CardInfo from '../card/CardInfo';
import CardUser from '../card/CardUser';
import useThemeContext from '../../../hooks/useThemeContext';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: url(${({ bgImg }) => bgImg}) 100% 100% no-repeat;
`;

const CardWrapper = styled(Container)`
  grid-gap: 7vh;
  background-size: cover;
`;

const CardUserWrapper = styled.div`
  display: flex;
  grid-gap: 10vw;

  @media (${({ theme }) => theme.xlDown}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Header = () => {
  const theme = useThemeContext();

  return (
    <CardWrapper bgImg={bgContainerCard}>
      <CardInfo
        title="Pool It"
        text="is a decentralized savings and pooling protocol built on the Ethereum network."
      />
      <CardInfo title="What can we offer customers?" />

      <CardUserWrapper>
        <CardUser text="No Loss Lottery, Prize incentives" />

        <CardUser
          text="Public and Private Liquidity Pools"
          bgColor={theme.blue}
          color={theme.white}
        />

        <CardUser text="Savings Account" />
      </CardUserWrapper>
    </CardWrapper>
  );
};

export default Header;
