import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';

export default class Content extends React.Component {
  render() {
    return <main>
      <Switch>
        {/* <Route exact path='/' component={Home}/> */}
        <Route path='/products' component={Products}/>
        <Route path='/products/new' component={ProductForm}/>
      </Switch>
    </main>
  }
}