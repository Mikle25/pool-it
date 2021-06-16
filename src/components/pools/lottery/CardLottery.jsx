import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLotteryStateContext } from '../../../store/lotteryContext';
import { useUserStateContext } from '../../../store/userContext';
import { convertEtherToUSDT, randomColor } from '../../../utils/helpers';
import TblCards from '../../styled/TblCards';
import UserButtons from './Buttons/UserButtons';
import AdminButtons from './Buttons/AdminButtons';
import { IconWrapper } from '../../styled/Icon';
import useThemeContext from '../../../hooks/useThemeContext';
import Times from '../../Times';

const BalancePool = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 0 auto;
`;

const CardLottery = ({ pool }) => {
  const { isAdmin } = useLotteryStateContext();
  const { address } = useUserStateContext();
  const [activePool, setActive] = useState('Active');
  const [showBtn, setShowBtn] = useState(true);
  const theme = useThemeContext();

  return (
    <>
      <TblCards.Header>
        <span className="active">{activePool}</span>
      </TblCards.Header>

      <TblCards.Body>
        <span>{pool.id}</span>
        <IconWrapper bgColor={randomColor}>
          <FontAwesomeIcon
            icon={['fab', 'ethereum']}
            color={theme.white}
            style={{ verticalAlign: 'middle' }}
          />
        </IconWrapper>

        <Times
          participationEndDate={pool.participationEndDate}
          startDate={pool.startDate}
          endDate={pool.endDate}
          setActive={setActive}
          setShowBtn={setShowBtn}
          liquidated={pool.liquidated}
        />

        <BalancePool>
          <span>Rate: {convertEtherToUSDT(pool.participationAmount)} USDT</span>

          <span>Balance: {convertEtherToUSDT(pool.balancePool)} USDT</span>
        </BalancePool>

        {isAdmin ? (
          <>
            {!showBtn && (
              <AdminButtons
                poolAddress={pool.poolAddress}
                liquidated={pool.liquidated}
                userAddress={address}
              />
            )}
          </>
        ) : (
          <UserButtons
            poolAddress={pool.poolAddress}
            userAddress={address}
            participationAmount={pool.participationAmount}
            winner={pool.winner}
            showBtnPlay={showBtn}
          />
        )}
      </TblCards.Body>
    </>
  );
};

CardLottery.propTypes = {
  pool: PropTypes.objectOf(PropTypes.any),
};

CardLottery.defaultProps = {
  pool: {},
};

export default CardLottery;
