import React from 'react';
import styled from 'styled-components';
import { Nav, Tab } from 'react-bootstrap';
import bgPools from '../assets/img/bg-pools.png';
import { useUserStateContext } from '../store/userContext';
import BtnCreateNewPool from '../components/BtnCreateNewPool';
import MyPools from '../components/pools/my-pools/MyPools';
import PublicPools from '../components/pools/public-pools/PublicPools';

const Container = styled.section`
  background: url(${bgPools}) top no-repeat;
  background-size: cover;
`;
const ContentWrap = styled.div`
  padding: 0 14vw 3vw;

  @media (${({ theme }) => theme.xlDown}) {
    padding: 0 5vw 5vh;
    row-gap: 15vh;
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-top: 160px;
`;

const NavTabs = styled(Nav).attrs({
  variant: 'pills',
})`
  display: flex;
  gap: 5vw;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fs36};
  font-weight: 700;

  @media (${({ theme }) => theme.xlDown}) {
    font-size: ${({ theme }) => theme.fs24};
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
    <Container>
      <ContentWrap>
        <Content>
          <Tab.Container
            defaultActiveKey={isLoggedIn ? 'my-pools' : 'public-pools'}
          >
            <NavTabs variant="pills">
              <TabLinkWrap>
                <NavTabs.Item>
                  <NavTabs.Link eventKey="my-pools" disabled={!isLoggedIn}>
                    My pools
                  </NavTabs.Link>
                </NavTabs.Item>

                <NavTabs.Item>
                  <NavTabs.Link eventKey="public-pools">
                    Public pools
                  </NavTabs.Link>
                </NavTabs.Item>
              </TabLinkWrap>

              <BtnCreateNewPool className="btn" />
            </NavTabs>

            <Tab.Content>
              <Tab.Pane eventKey="my-pools">
                <MyPools />
              </Tab.Pane>

              <Tab.Pane eventKey="public-pools">
                <PublicPools />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Content>
      </ContentWrap>
    </Container>
  );
};

export default Pools;
