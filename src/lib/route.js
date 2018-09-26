import React from 'react';
import {Route, Redirect} from 'react-router';

export const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

export const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
};

export const PrivateRoute = ({component, authenticate, ...rest}) => (
  <Route
    {...rest}
    render={props => authenticate ? renderMergedProps(component, props, rest) : <Redirect to="/main"/>}
  />
);