import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import TableCards from '../../TableCards';
import { SubTitle } from '../../styled/Text';
import { ContainerTable } from '../../styled/Wrappers';
import UserActivities from './chart/UserActivities';
import OtherInfo from './other-info/OtherInfo';
import { usePoolsStateContext } from '../../../store/poolsContext';
import CardPool from './CardPool';

const Statistic = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 2rem;
`;

const MyPools = () => {
  const { isLoad, dataPools } = usePoolsStateContext();

  return (
    <ContainerTable>
      {isLoad && <Spinner animation="border" variant="primary" />}

      <TableCards
        rows={dataPools || []}
        rowKey="id"
        loading={isLoad}
        content={(pool) => <CardPool pool={pool} />}
      />

      <Statistic>
        <SubTitle>Statistic</SubTitle>

        <UserActivities />
      </Statistic>

      <OtherInfo />
    </ContainerTable>
  );
};

export default MyPools;
