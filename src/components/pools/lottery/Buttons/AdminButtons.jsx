import React from 'react';
import PropTypes from 'prop-types';
import { Btn } from '../../../styled/Btn';
import { useLotteryDispatchContext } from '../../../../store/lotteryContext';

const AdminButtons = ({ poolAddress, userAddress, liquidated }) => {
  const { setWinner } = useLotteryDispatchContext();

  return (
    <>
      {!liquidated && (
        <Btn
          style={{ minWidth: '200px' }}
          onClick={() => {
            setWinner(poolAddress, userAddress);
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
  userAddress: PropTypes.string,
  liquidated: PropTypes.bool.isRequired,
};

AdminButtons.defaultProps = {
  userAddress: '',
};

export default AdminButtons;
