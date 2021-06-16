import React from 'react';
import PropTypes from 'prop-types';
import { Btn } from '../../../styled/Btns';
import { useLotteryDispatchContext } from '../../../../store/lotteryContext';

const AdminButtons = ({ poolAddress, liquidated }) => {
  const { setWinner } = useLotteryDispatchContext();

  return (
    <>
      {!liquidated && (
        <Btn
          style={{ minWidth: '200px' }}
          onClick={() => {
            setWinner(poolAddress);
          }}
        >
          Set winner
        </Btn>
      )}
    </>
  );
};

AdminButtons.propTypes = {
  poolAddress: PropTypes.string.isRequired,
  liquidated: PropTypes.bool.isRequired,
};

export default AdminButtons;
