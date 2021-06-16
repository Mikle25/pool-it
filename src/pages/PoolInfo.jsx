import React, { useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { web3 } from '../plugins/web3';
import ParticipatePool from '../components/pools/participate-pool/ParticipatePool';
import { ParticipateProvider } from '../store/participateContext';

const PoolInfo = () => {
  const location = useLocation();
  const history = useHistory();
  const { address } = useParams();

  useEffect(() => {
    // refactor check address
    if (!location.state && !web3.utils.isAddress(address)) {
      history.replace('/not-found');
      return;
    }

    history.push(`/pool/${address}`);
  }, [address, history, location.state]);

  return (
    <ParticipateProvider>
      <ParticipatePool />
    </ParticipateProvider>
  );
};

export default PoolInfo;
