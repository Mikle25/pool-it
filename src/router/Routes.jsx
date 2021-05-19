import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Pools from '../pages/Pools';
import Lottery from '../pages/Lottery';

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/pools" component={Pools} />
      <Route path="/lottery" component={Lottery} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routers;
