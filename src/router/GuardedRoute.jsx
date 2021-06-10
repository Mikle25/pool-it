/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const GuardedRoute = ({ component: Component, isMetaMaskInstall, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isMetaMaskInstall ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default GuardedRoute;
