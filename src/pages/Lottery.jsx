import React from 'react';
import styled from 'styled-components';
import {
  ContentWrap,
  Content,
  ContainerTable,
} from '../components/styled/Wrappers';
import { FlexJustifyBetween } from '../components/styled/Flex';
import { SubTitle } from '../components/styled/Text';
import CreatePoolLottery from '../components/lottery/CreatePoolLottery';
import TableCards from '../components/TableCards';
import CardLottery from '../components/lottery/CardLottery';
import { useContractStateContext } from '../store/contractContext';
import bgPools from '../assets/img/bg-pools.png';

const Container = styled.section`
  background: url(${bgPools}) top no-repeat;
  background-size: cover;
  min-height: 800px;
`;

const LotteryHeader = styled(FlexJustifyBetween)`
  align-items: center;
`;

// const mockData = [
//   {
//     id: 1,
//     name: 'DFAR pool №1',
//     total: 3243424,
//     active: 'Active',
//   },
//   {
//     id: 2,
//     name: 'DFAR pool №1',
//     total: 3243424,
//     active: 'Active',
//   },
// ];

const Lottery = () => {
  const { isAdmin, poolInfo } = useContractStateContext();

  return (
    <Container>
      <ContentWrap>
        <Content>
          <LotteryHeader>
            <SubTitle>Lottery</SubTitle>

            {isAdmin && <CreatePoolLottery />}
          </LotteryHeader>

          <ContainerTable>
            {poolInfo.length === 0 ? (
              <div>Not data</div>
            ) : (
              <TableCards
                rows={poolInfo}
                rowKey="id"
                maxHeight="600px"
                content={(pool) => <CardLottery pool={pool} />}
              />
            )}
          </ContainerTable>
        </Content>
      </ContentWrap>
    </Container>
  );
};

export default Lottery;
