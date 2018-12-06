import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BankSubmit from '../bank/SubmitFileForm';
import routes from './Routes';

export default class RoutesRenderer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={BankSubmit} />
        {
          routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              component={route.component} />
          ))
        }
      </Switch>
    )
  }
}