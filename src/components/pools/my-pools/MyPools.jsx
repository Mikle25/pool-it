import React from 'react';
import styled from 'styled-components';
import TableCards from '../../TableCards';
import CardMyPool from './CardMyPool';
import { SubTitle } from '../../styled/Text';
import { ContainerTable } from '../../styled/Wrappers';
import UserActivities from './chart/UserActivities';
import OtherInfo from './other-info/OtherInfo';
import { usePoolsStateContext } from '../../../store/poolsContract';

const Statistic = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const MyPools = () => {
  const { dataPools, isLoad } = usePoolsStateContext();

  return (
    <ContainerTable>
      {!dataPools ? (
        <div>Not data</div>
      ) : (
        <TableCards
          rows={dataPools}
          maxHeight="750px"
          rowKey="id"
          loading={isLoad}
          content={(pool) => <CardMyPool pool={pool} />}
        />
      )}

      <Statistic>
        <SubTitle>Statistic</SubTitle>

        <UserActivities />
      </Statistic>

      <OtherInfo />
    </ContainerTable>
  );
};

export default MyPools;
