import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlexAlignItemsCenter } from '../styled/Flex';
import { Btn } from '../styled/Btn';
import {
  useContractDispatchContext,
  useContractStateContext,
} from '../../store/contractContext';
import { useUserStateContext } from '../../store/userContext';
import { convertEtherToUSDT, convertTimeSecToMSec } from '../../utils/helpers';
import TblCards from '../styled/TblCards';

const TimeWrap = styled(FlexAlignItemsCenter)`
  gap: 10px;
  flex: 0 0 25%;

  & span {
    font-weight: 700;
  }

  & > span {
    align-self: flex-end;
  }
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;

const BalancePool = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 0 auto;
`;

const CardLottery = ({ pool }) => {
  const { playLottery, setWinner } = useContractDispatchContext();
  const { isAdmin } = useContractStateContext();
  const { address } = useUserStateContext();
  const [activePool, setActive] = useState(true);
  const [time, setTime] = useState({
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '0',
  });
  const participationEndDate = convertTimeSecToMSec(
    Number(pool.participationEndDate),
  );

  useEffect(() => {
    const times = setInterval(() => {
      const nowDate = new Date().getTime();
      if (nowDate > participationEndDate) {
        setActive(false);
        return setTime({
          seconds: '00',
          minutes: '00',
          hours: '00',
          days: '0',
        });
      }

      const t = participationEndDate - nowDate;
      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / 1000 / 60 / 60) % 24);
      const days = Math.floor(t / 1000 / 60 / 60 / 24);

      if (seconds < 10) seconds = `0${seconds}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (hours < 10) hours = `0${hours}`;

      return setTime({
        seconds,
        minutes,
        hours,
        days,
      });
    }, 1000);

    return () => {
      clearInterval(times);
    };
  }, [participationEndDate]);

  return (
    <>
      {time ? (
        <>
          <TblCards.Header>
            <span className="active">
              {activePool ? 'Active' : 'Not active'}
            </span>
          </TblCards.Header>

          <TblCards.Body>
            <TimeWrap>
              <Time>
                <span>DAY</span>
                <span>{time.days}</span>
              </Time>

              <Time>
                <span>HR</span>
                <span>{time.hours}</span>
              </Time>

              <span>:</span>

              <Time>
                <span>MIN</span>
                <span>{time.minutes}</span>
              </Time>

              <span>:</span>

              <Time>
                <span>SEC</span>
                <span>{time.seconds}</span>
              </Time>
            </TimeWrap>

            <BalancePool>
              <span>
                Rate: {convertEtherToUSDT(pool.participationAmount)} USDT
              </span>

              <span>Balance: {convertEtherToUSDT(pool.balancePool)} USDT</span>
            </BalancePool>

            {isAdmin ? (
              <Btn
                style={{ width: '200px' }}
                onClick={() => {
                  setWinner(pool.poolAddress, address);
                }}
              >
                Set winner
              </Btn>
            ) : (
              <Btn
                style={{ width: '200px' }}
                onClick={() =>
                  playLottery(
                    pool.poolAddress,
                    address,
                    pool.participationAmount,
                  )
                }
              >
                Play
              </Btn>
            )}
          </TblCards.Body>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

CardLottery.propTypes = {
  pool: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CardLottery;
