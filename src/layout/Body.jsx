import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import BankSubmit from '../bank/SubmitFileForm';
import Transactions from "../bank/Transactions";

export default class Body extends React.Component {
  render() {
    return <main>
      <Switch>
        <Route exact path='/' component={BankSubmit} />
        <Route path='/products/new' component={ProductForm} />
        <Route path='/products/:id' component={ProductForm} />
        <Route path='/products' component={Products} />
        <Route path='/transactions' component={Transactions} />
      </Switch>
    </main>
  }
}