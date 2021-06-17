import React from 'react';
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
import { Blue, LightBlue, SubTitle } from '../../styled/Text';
import { convertEtherToUSDT } from '../../../utils/helpers';
import { useUserStateContext } from '../../../store/userContext';
import BtnCopy from '../../BtnCopy';
import useModal from '../../../hooks/useModal';

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
  const { isDataPool, isLoading } = useParticipateStateContext();
  const { show, handleClose, handleShow } = useModal();

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

                      <SubTitle>DFAR</SubTitle>
                    </PoolName>

                    <Blue fw={500}>Private</Blue>
                  </PoolHeader>

                  <div>
                    <Blue>Pool address: </Blue>
                    <LightBlue> {isDataPool.poolAddress}</LightBlue>
                  </div>

                  <div>
                    <Blue>Owner: </Blue>
                    <LightBlue>{isDataPool.beneficiary}</LightBlue>
                  </div>
                  <div>
                    <Blue>Pool token: </Blue>
                    <LightBlue>{isDataPool.poolToken}</LightBlue>
                  </div>
                  <div>
                    <Blue>Number of participation: </Blue>
                    <LightBlue>{isDataPool.participantsLength}</LightBlue>
                  </div>

                  <div>
                    <Blue>Balance: </Blue>
                    <LightBlue>
                      {convertEtherToUSDT(isDataPool.balancePool)} USDT
                    </LightBlue>
                  </div>

                  <div>
                    <Blue>Link to participate</Blue>
                    <BtnCopy textToCopy={window.location.href} />
                  </div>
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
                      handleShow={handleShow}
                      handleClose={handleClose}
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
