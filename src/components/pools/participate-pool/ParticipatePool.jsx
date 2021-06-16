import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import { Content, ContentWrap } from '../../styled/Wrappers';
import BtnBack from '../../BtnBack';
import { IconWrapper } from '../../styled/Icon';
import Modal from '../../styled/Modal';
import { Btn } from '../../styled/Btns';
import useThemeContext from '../../../hooks/useThemeContext';
import bgPools from '../../../assets/img/bg-pools.png';
import { FlexAlignItemsCenter, FlexJustifyBetween } from '../../styled/Flex';
import ParticipationPoolForm from './ParticipationPoolForm';
import { useParticipateStateContext } from '../../../store/participateContext';
import { Blue, SubTitle } from '../../styled/Text';
import { convertEtherToUSDT } from '../../../utils/helpers';
import { useUserStateContext } from '../../../store/userContext';

const Container = styled.section`
  background: url(${bgPools}) top no-repeat;
  background-size: cover;
`;

const InfoContainer = styled(FlexAlignItemsCenter)`
  display: flex;
  justify-content: space-between;
`;

const PoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 500px;
  padding: 2rem;
  border: 2px solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.radiusCard};
  gap: 20px;
`;

PoolContainer.Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PoolName = styled(FlexAlignItemsCenter)`
  column-gap: 20px;
`;

const PoolHeader = styled(FlexJustifyBetween)`
  align-items: center;
`;

const ParticipatePool = () => {
  const theme = useThemeContext();
  const { isLoggedIn } = useUserStateContext();
  const [show, setShow] = useState(false);
  const { isDataPool, isLoading } = useParticipateStateContext();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Container>
      <ContentWrap>
        <Content>
          <BtnBack />

          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <InfoContainer>
              <PoolContainer>
                <PoolContainer.Info>
                  <PoolHeader>
                    <PoolName>
                      <IconWrapper bgColor={theme.darkBlue}>
                        <FontAwesomeIcon
                          icon={['fab', 'ethereum']}
                          color={theme.white}
                          style={{ verticalAlign: 'middle' }}
                        />
                      </IconWrapper>

                      <SubTitle>DFAR {isDataPool.id}</SubTitle>
                    </PoolName>

                    <Blue style={{ fontWeight: 500 }}>Private</Blue>
                  </PoolHeader>

                  <Blue>Pool address: {isDataPool.poolAddress}</Blue>
                  <Blue>Owner: {isDataPool.beneficiary}</Blue>
                  <Blue>
                    Balance: {convertEtherToUSDT(isDataPool.balancePool)}
                  </Blue>
                  <Blue>
                    Number of participation: {isDataPool.participantsLength}
                  </Blue>
                  <Blue>Pool token: {isDataPool.poolToken}</Blue>

                  <a href={window.location.href}>link participation</a>
                </PoolContainer.Info>

                <Modal
                  show={show}
                  onHide={handleClose}
                  centered
                  keyboard={false}
                  backdrop="static"
                >
                  <Modal.Header closeButton>
                    <SubTitle>Deposit</SubTitle>
                  </Modal.Header>

                  <Modal.Body>
                    <ParticipationPoolForm
                      setShow={setShow}
                      close={handleClose}
                      poolAddress={isDataPool.poolAddress}
                    />
                  </Modal.Body>
                </Modal>

                <Btn
                  className="btn-size"
                  onClick={handleShow}
                  disabled={!isLoggedIn}
                >
                  Deposit DFAR
                </Btn>
              </PoolContainer>
            </InfoContainer>
          )}
        </Content>
      </ContentWrap>
    </Container>
  );
};

export default ParticipatePool;
