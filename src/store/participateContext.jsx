import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useSavingPool from '../hooks/useSavingPool';
import handlerError from '../utils/errorsHandler';

// State context
const ParticipateStateContext = createContext(undefined);
ParticipateStateContext.displayName = 'ParticipateStateContext';

const useParticipateStateContext = () => {
  const context = useContext(ParticipateStateContext);

  if (!context) {
    throw new Error(
      'ParticipateStateContext must be used within a ParticipateStateContext',
    );
  }

  return context;
};

// Dispatch context
const ParticipateDispatchContext = createContext(undefined);
ParticipateDispatchContext.displayName = 'ParticipateDispatchContext';
const useParticipateDispatchContext = () => {
  const context = useContext(ParticipateDispatchContext);

  if (!context) {
    throw new Error(
      'ParticipateDispatchContext must be used within a ParticipateDispatchContext',
    );
  }

  return context;
};

// Provider
const ParticipateProvider = ({ children }) => {
  const { address: poolAddress } = useParams();
  const [isUpdatePool, setUpdatePool] = useState(false);
  const { dataFromPool, participate } = useSavingPool(setUpdatePool);
  const [isDataPool, setDataPool] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await dataFromPool(poolAddress);
        setDataPool(res);
      } catch (e) {
        handlerError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataFromPool, poolAddress, isUpdatePool]);

  const stateValue = useMemo(() => {
    return {
      isDataPool,
      isLoading,
    };
  }, [isDataPool, isLoading]);
  const dispatchValue = useMemo(() => {
    return {
      participate,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ParticipateStateContext.Provider value={stateValue}>
      <ParticipateDispatchContext.Provider value={dispatchValue}>
        {children}
      </ParticipateDispatchContext.Provider>
    </ParticipateStateContext.Provider>
  );
};

ParticipateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  ParticipateProvider,
  useParticipateDispatchContext,
  useParticipateStateContext,
};
