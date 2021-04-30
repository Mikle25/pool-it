import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LightBlue, SubTitle } from '../../../styled/Text';
import cupIcon from '../../../../assets/img/other-info-cup-icon.svg';
import { BtnWhite } from '../../../styled/Btn';
import DynamicCoins from '../chart/DynamicCoins';
import useThemeContext from '../../../../hooks/useThemeContext';
import { FlexCenter, FlexJustifyBetween } from '../../../styled/Flex';
import TableTransactions from './table/TableTransactions';
import { IconWrapper } from '../../../styled/Icon';
import { randomColor } from '../../../../utils/helpers';

const ContainerOtherInfo = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const OtherInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

OtherInfoWrap.Items = styled(FlexJustifyBetween)`
  gap: 2rem;
  flex-wrap: wrap;

  @media (${({ theme }) => theme.lgDown}) {
    justify-content: center;
  }
`;

const CardOtherInfo = styled(FlexCenter)`
  display: flex;
  align-items: center;
  width: 475px;
  height: 245px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.lightBlue};
  border-radius: ${({ theme }) => theme.radiusCard};
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    max-width: 10rem;
  }
`;

const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 50%;
  gap: 1rem;
`;

const PopularCoinsWrap = styled(FlexCenter)`
  flex: 1 1 45%;
`;

const PopularCoins = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 50%;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.radiusCard};
`;

const CoinsWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

const ItemCoin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Transactions.Header = styled(FlexJustifyBetween)``;

const mockTransactions = [
  {
    id: 1,
    name: 'Duet biahyddrot usar',
    percent: 12,
    date: '19/04/2021',
  },
  {
    id: 2,
    name: 'Duet bili cahydafrot usar',
    percent: 12,
    date: '19/04/2021',
  },
  {
    id: 3,
    name: 'Duaei caxxahyddrot usar',
    percent: 12,
    date: '19/04/2021',
  },
  {
    id: 4,
    name: 'Dusset bili cahyddrot sar',
    percent: 12,
    date: '19/04/2021',
  },
];

const mockPopularCoins = [
  {
    name: 'BTC',
    percent: 14,
  },
  {
    name: 'ETH',
    percent: 15,
  },
  {
    name: 'Verge',
    percent: 12,
  },
  {
    name: 'Tezos',
    percent: 10,
  },
];

const OtherInfo = () => {
  const theme = useThemeContext();

  return (
    <ContainerOtherInfo>
      <SubTitle>Other information</SubTitle>

      <OtherInfoWrap>
        <OtherInfoWrap.Items>
          <CardOtherInfo>
            <img src={cupIcon} alt="cup" />

            <div>
              <SubTitle fs={theme.fs24} color={theme.darkBlue}>
                You can get a prize
              </SubTitle>

              <BtnWhite>More</BtnWhite>
            </div>
          </CardOtherInfo>

          <DynamicCoins />
        </OtherInfoWrap.Items>

        <OtherInfoWrap.Items>
          <Transactions>
            <Transactions.Header>
              <LightBlue fw={500}>Transactions</LightBlue>
              <span>See All</span>
            </Transactions.Header>

            <div>
              <TableTransactions data={mockTransactions} />
            </div>
          </Transactions>

          <PopularCoinsWrap>
            <PopularCoins>
              <LightBlue fw={500}>Popular coins</LightBlue>

              <CoinsWrap>
                {mockPopularCoins.map((coin) => (
                  <ItemCoin key={coin.name}>
                    <IconWrapper bgColor={randomColor}>
                      <FontAwesomeIcon
                        icon={['fab', 'ethereum']}
                        color={theme.white}
                        style={{ verticalAlign: 'middle' }}
                      />
                    </IconWrapper>
                    <span>{coin.name}</span>
                    <span>{coin.percent}%</span>
                  </ItemCoin>
                ))}
              </CoinsWrap>
            </PopularCoins>
          </PopularCoinsWrap>
        </OtherInfoWrap.Items>
      </OtherInfoWrap>
    </ContainerOtherInfo>
  );
};

export default OtherInfo;
