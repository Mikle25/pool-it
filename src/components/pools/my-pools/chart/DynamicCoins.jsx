import React from 'react';
import styled from 'styled-components';
import { LightBlue } from '../../../styled/Text';
import { FlexJustifyBetween } from '../../../styled/Flex';
import LineChart from '../../../chart-types/LinerChart';

const ContainerChart = styled.div`
  position: relative;
  top: 3rem;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 20px;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: ${({ theme }) => theme.radiusCard};
  width: 500px;

  @media (${({ theme }) => theme.lgDown}) {
    width: 100%;
    position: static;
  }
`;

ContainerChart.Header = styled(FlexJustifyBetween)`
  align-items: center;
`;

const mockDataCoins = [
  {
    btc: 10,
    eth: 10,
  },
  {
    btc: 25,
    eth: 20,
  },
  {
    btc: 30,
    eth: 40,
  },
  {
    btc: 45,
    eth: 50,
  },
  {
    btc: 40,
    eth: 35,
  },
  {
    btc: 25,
    eth: 20,
  },
  {
    btc: 10,
    eth: 10,
  },
];

const DynamicCoins = () => {
  return (
    <ContainerChart>
      <ContainerChart.Header>
        <LightBlue style={{ fontWeight: 500 }}>Dynamics</LightBlue>
        <span>See details</span>
      </ContainerChart.Header>

      <div style={{ width: '100%' }}>
        <LineChart data={mockDataCoins} />
      </div>
    </ContainerChart>
  );
};

export default DynamicCoins;
