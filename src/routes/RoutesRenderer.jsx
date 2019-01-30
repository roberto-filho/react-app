import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './Routes';

export default class RoutesRenderer extends React.Component {
  render() {
    return (
      <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact || true}
              path={route.path}
              component={route.component} />
          ))
        }
      </Switch>
    )
  }
}