import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlexAlignItemsCenter } from './styled/Flex';
import { convertTimeSecToMSec } from '../utils/helpers';
import {
  msInHours,
  msInDays,
  msInMinutes,
  msInSeconds,
} from '../utils/constants';

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

const Times = ({
  setActive,
  participationEndDate,
  startDate,
  endDate,
  setShowBtn,
  liquidated,
}) => {
  const [time, setTime] = useState({
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '0',
  });

  const participationEndDateLottery = convertTimeSecToMSec(
    participationEndDate,
  );
  const startDateLottery = convertTimeSecToMSec(startDate);
  const endDateLottery = convertTimeSecToMSec(endDate);

  useEffect(() => {
    const nowDate = new Date().getTime();
    if (endDateLottery < nowDate && liquidated) {
      return setActive('Winner selected');
    }
    if (endDateLottery < nowDate) {
      return setActive('Waiting for the winner');
    }
    if (nowDate > participationEndDateLottery) {
      return setActive('Not active');
    }

    return setActive('Active');
  }, [
    endDateLottery,
    liquidated,
    participationEndDateLottery,
    setActive,
    setShowBtn,
    startDateLottery,
  ]);

  useEffect(() => {
    const times = setInterval(() => {
      const nowDate = new Date().getTime();
      if (nowDate > participationEndDateLottery) {
        setShowBtn(false);
        return setTime({
          seconds: '00',
          minutes: '00',
          hours: '00',
          days: '0',
        });
      }

      let t;
      if (nowDate < startDateLottery) {
        t = startDateLottery - nowDate;
      } else {
        t = participationEndDateLottery - nowDate;
      }
      let seconds = Math.floor((t / msInSeconds) % 60);
      let minutes = Math.floor((t / msInMinutes) % 60);
      let hours = Math.floor((t / msInHours) % 24);
      const days = Math.floor(t / msInDays);

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
  }, [
    endDateLottery,
    participationEndDateLottery,
    setActive,
    setShowBtn,
    setTime,
    startDateLottery,
  ]);

  return (
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
  );
};

Times.propTypes = {
  participationEndDate: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  setShowBtn: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  liquidated: PropTypes.bool.isRequired,
};

export default Times;
