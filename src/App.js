import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Products from './products/Products';
import Header from './layout/Header';

export default class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Products />
        </div>
      </MuiThemeProvider>
    );
  }
}