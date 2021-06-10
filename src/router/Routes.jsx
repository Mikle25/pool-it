import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Pools from '../pages/Pools';
import GuardedRoute from './GuardedRoute';
import { useUserStateContext } from '../store/userContext';

const Routers = () => {
  const { isMetaMaskInstall } = useUserStateContext();

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <GuardedRoute
        path="/pools"
        component={Pools}
        isMetaMaskInstall={isMetaMaskInstall}
      />

      <GuardedRoute
        exact
        path="/pools/:address"
        isMetaMaskInstall={isMetaMaskInstall}
      />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routers;
