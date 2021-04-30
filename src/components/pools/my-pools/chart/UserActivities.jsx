import React from 'react';
import styled from 'styled-components';
import { LightBlue } from '../../../styled/Text';
import BarChart from '../../../chart-types/BarChart';
import { FlexJustifyBetween } from '../../../styled/Flex';

const ContainerChart = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  row-gap: 2rem;
  padding: 20px 60px 50px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);

  @media (${({ theme }) => theme.lgDown}) {
    padding: 10px;
  }
`;

const ChartWrap = styled.div`
  width: 90%;
  align-self: center;

  @media (${({ theme }) => theme.lgDown}) {
    width: 100%;
  }
`;

ContainerChart.Header = styled(FlexJustifyBetween)`
  align-items: center;
`;

const BtnDots = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 2rem;
  height: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    width: 0.25rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.darkBlue};
    border-radius: 10px;
    position: relative;
  }
`;

const statisticData = [
  {
    month: 'Jan',
    value: 65,
  },
  {
    month: 'Feb',
    value: 25,
  },
  {
    month: 'Mar',
    value: 30,
  },
  {
    month: 'Apr',
    value: 40,
  },
  {
    month: 'May',
    value: 75,
  },
  {
    month: 'Jun',
    value: 35,
  },
  {
    month: 'Jul',
    value: 80,
  },
  {
    month: 'Sep',
    value: 15,
  },
  {
    month: 'Oct',
    value: 50,
  },
  {
    month: 'Nov',
    value: 30,
  },
  {
    month: 'Dec',
    value: 90,
  },
];

const UserActivities = () => {
  return (
    <ContainerChart>
      <ContainerChart.Header>
        <LightBlue style={{ fontWeight: 500 }}>User activities</LightBlue>

        <BtnDots>
          <span />
          <span />
          <span />
        </BtnDots>
      </ContainerChart.Header>

      <ChartWrap>
        <BarChart data={statisticData} />
      </ChartWrap>
    </ContainerChart>
  );
};

export default UserActivities;
