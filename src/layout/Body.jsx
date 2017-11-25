import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../products/Products';
import ProductForm from '../products/ProductForm';

export default class Body extends React.Component {
  render() {
    return <main>
      <Switch>
        {/* <Route exact path='/' component={Home}/> */}
        <Route path='/products/new' component={ProductForm}/>
        <Route path='/products/:id' component={ProductForm}/>
        <Route path='/products' component={Products}/>
      </Switch>
    </main>
  }
}