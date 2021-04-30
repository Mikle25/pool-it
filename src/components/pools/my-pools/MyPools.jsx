import React from 'react';
import styled from 'styled-components';
import TableCards from '../../TableCards';
import CardMyPool from './CardMyPool';
import { SubTitle } from '../../styled/Text';
import { ContainerPools } from '../../styled/Wrappers';
import UserActivities from './chart/UserActivities';
import OtherInfo from './other-info/OtherInfo';

const Statistic = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const mockData = [
  {
    id: 1,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 2,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 3,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 4,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 5,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 6,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
  {
    id: 7,
    name: 'DFAR pool №1',
    total: 3243424,
    value: '144.8$(@ $2,448/ETH)',
    percent: 12.5,
    active: 'Active',
  },
];

const MyPools = () => {
  return (
    <ContainerPools>
      <TableCards
        rows={mockData}
        maxHeight="750px"
        rowKey="id"
        content={(row) => <CardMyPool row={row} />}
      />

      <Statistic>
        <SubTitle>Statistic</SubTitle>

        <UserActivities />
      </Statistic>

      <OtherInfo />
    </ContainerPools>
  );
};

export default MyPools;
