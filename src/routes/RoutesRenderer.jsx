import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import BankSubmit from '../bank/SubmitFileForm';
import Transactions from "../bank/Transactions";
import Categories from '../categories/Categories';
import Uploads from '../uploads/Uploads';

export default class RoutesRenderer extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={BankSubmit} />
        <Route path='/products/new' component={ProductForm} />
        <Route path='/products/:id' component={ProductForm} />
        <Route path='/products' component={Products} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/categories' component={Categories} />
        <Route path='/uploads' component={Uploads} />
      </Switch>
    )
  }
}