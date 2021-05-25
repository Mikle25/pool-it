import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Btn } from '../../styled/Btn';
import { FlexAlignItemsCenter } from '../../styled/Flex';
import useThemeContext from '../../../hooks/useThemeContext';
import {
  convertEtherToUSDT,
  convertTimeSecToMSec,
  randomColor,
} from '../../../utils/helpers';
import { IconWrapper } from '../../styled/Icon';
import TblCards from '../../styled/TblCards';
import { LightBlue, Purple } from '../../styled/Text';
import { usePoolsDispatchContext } from '../../../store/poolsContract';
import { useUserStateContext } from '../../../store/userContext';

const Total = styled(FlexAlignItemsCenter)`
  min-width: fit-content;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.lightBlue};
  border-radius: 30px;
  padding: 5px 25px;
  column-gap: 2vw;
`;

const TotalWrap = styled(FlexAlignItemsCenter)`
  gap: 20px;
  flex: 1 0 auto;

  .item {
    width: 40%;
  }

  @media (${({ theme }) => theme.mdDown}) {
    flex-wrap: wrap;
    .item {
      width: 100%;
    }
  }
`;

const InfoWrap = styled(FlexAlignItemsCenter)`
  flex: 3 1 auto;
  column-gap: 5rem;

  @media (${({ theme }) => theme.mdDown}) {
    justify-content: space-between;
    column-gap: 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (${({ theme }) => theme.mdDown}) {
    &:first-child {
      order: 2;
      align-items: flex-end;
      text-align: right;
    }

    &:last-child {
      order: 1;
      align-items: start;
    }
  }
`;

const BodyCardName = styled(FlexAlignItemsCenter)`
  overflow-wrap: anywhere;
  gap: 2vw;
  flex: 1 0 auto;

  @media (${({ theme }) => theme.smDown}) {
    .active {
      display: none;
    }
  }
`;

const CardMyPool = ({ pool }) => {
  const theme = useThemeContext();
  const { address } = useUserStateContext();
  const { participation } = usePoolsDispatchContext();

  return (
    <>
      <TblCards.Header>
        <BodyCardName>
          <IconWrapper bgColor={randomColor}>
            <FontAwesomeIcon
              icon={['fab', 'ethereum']}
              color={theme.white}
              style={{ verticalAlign: 'middle' }}
            />
          </IconWrapper>

          <span>{pool.id}</span>

          {convertTimeSecToMSec(pool.participationEndDate) >
          new Date().getTime() ? (
            <span className="active">Active</span>
          ) : (
            <span className="active">Not active</span>
          )}
        </BodyCardName>

        {!pool.isLottery && <span>Private</span>}
      </TblCards.Header>

      <TblCards.Body>
        <TotalWrap>
          <Total className="item">
            <div>Balance:</div>
            <div>{convertEtherToUSDT(pool.balancePool)} USDT</div>
          </Total>
        </TotalWrap>

        <InfoWrap>
          <Info>
            <span>Value</span>
            <LightBlue>
              {convertEtherToUSDT(pool.participationAmount)} USDT
            </LightBlue>
          </Info>

          <Info>
            <span>APY</span>
            <Purple>5%</Purple>
          </Info>
        </InfoWrap>
      </TblCards.Body>

      <TblCards.Footer>
        <Btn
          className="btn-size"
          fs={theme.fs14}
          onClick={() => {
            participation(pool.poolAddress, address, pool.participationAmount);
          }}
        >
          Deposit DFAR
        </Btn>

        <div>View pool</div>
      </TblCards.Footer>
    </>
  );
};

CardMyPool.propTypes = {
  pool: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardMyPool;
