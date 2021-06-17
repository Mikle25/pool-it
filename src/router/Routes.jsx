import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Pools from '../pages/Pools';
import PoolInfo from '../pages/PoolInfo';
import GuardedRoute from './GuardedRoute';
import { useUserStateContext } from '../store/userContext';

const Routers = () => {
  const { isMetaMaskInstall } = useUserStateContext();

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <GuardedRoute
        exact
        path="/pools"
        component={Pools}
        isMetaMaskInstall={isMetaMaskInstall}
      />

      <GuardedRoute
        exact
        path="/pool/:address"
        component={PoolInfo}
        isMetaMaskInstall={isMetaMaskInstall}
      />

      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routers;
