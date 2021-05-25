import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Pools from '../pages/Pools';

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/pools" component={Pools} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routers;
