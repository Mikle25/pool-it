import React from 'react';
import PropTypes from 'prop-types';
import { Btn } from '../../../styled/Btn';
import { useLotteryDispatchContext } from '../../../../store/lotteryContext';

const UserButtons = ({
  poolAddress,
  userAddress,
  participationAmount,
  winner,
  showBtnPlay,
}) => {
  const { playLottery, takeAmountWin } = useLotteryDispatchContext();

  return (
    <>
      {userAddress === winner ? (
        <Btn
          onClick={() => {
            takeAmountWin(poolAddress, userAddress);
          }}
        >
          Get your winnings
        </Btn>
      ) : (
        <>
          {showBtnPlay && (
            <Btn
              style={{ width: '200px' }}
              onClick={() =>
                playLottery(poolAddress, userAddress, participationAmount)
              }
            >
              Play
            </Btn>
          )}
        </>
      )}
    </>
  );
};

UserButtons.propTypes = {
  poolAddress: PropTypes.string.isRequired,
  userAddress: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  participationAmount: PropTypes.string.isRequired,
  showBtnPlay: PropTypes.bool.isRequired,
};

export default UserButtons;
