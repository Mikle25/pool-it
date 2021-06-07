import React from 'react';
import styled from 'styled-components';
import { Nav, Tab } from 'react-bootstrap';
import bgPools from '../assets/img/bg-pools.png';
import { useUserStateContext } from '../store/userContext';
import MyPools from '../components/pools/my-pools/MyPools';
import { ContentWrap, Content } from '../components/styled/Wrappers';
import Lottery from '../components/pools/lottery/Lottery';
import CreatePool from '../components/pools/CreatePool';
import { LotteryProvider } from '../store/lotteryContext';
import { PoolsProvider } from '../store/poolsContract';

const Container = styled.section`
  background: url(${bgPools}) top no-repeat;
  background-size: cover;
`;

const NavTabs = styled(Nav).attrs({
  variant: 'pills',
})`
  display: flex;
  gap: 5vw;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fs24};
  font-weight: 700;

  @media (${({ theme }) => theme.mdDown}) {
    font-size: ${({ theme }) => theme.fs18};
  }

  @media (${({ theme }) => theme.mdDown}) {
    .btn {
      width: 100%;
    }
  }

  .nav-link {
    opacity: 0.3;
    background-color: transparent !important;
    color: ${({ theme }) => theme.blue} !important;
    border-bottom: 5px solid ${({ theme }) => theme.blue};
    padding: 0;
    padding-bottom: 10px;

    &.active {
      opacity: 1;
    }
  }
`;

const TabLinkWrap = styled.div`
  display: flex;
  gap: 5vw;

  @media (${({ theme }) => theme.mdDown}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Pools = () => {
  const { isLoggedIn } = useUserStateContext();

  return (
    <LotteryProvider>
      <PoolsProvider>
        <Container>
          <ContentWrap>
            <Content>
              <Tab.Container
                defaultActiveKey={isLoggedIn ? 'my-pools' : 'lottery'}
              >
                <NavTabs variant="pills">
                  <TabLinkWrap>
                    <NavTabs.Item>
                      <NavTabs.Link eventKey="my-pools" disabled={!isLoggedIn}>
                        My pools
                      </NavTabs.Link>
                    </NavTabs.Item>

                    <NavTabs.Item>
                      <NavTabs.Link eventKey="lottery">Lottery</NavTabs.Link>
                    </NavTabs.Item>
                  </TabLinkWrap>

                  {isLoggedIn && <CreatePool />}
                </NavTabs>

                <Tab.Content>
                  <Tab.Pane eventKey="my-pools">
                    <MyPools />
                  </Tab.Pane>

                  <Tab.Pane eventKey="lottery">
                    <Lottery />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Content>
          </ContentWrap>
        </Container>
      </PoolsProvider>
    </LotteryProvider>
  );
};

export default Pools;
