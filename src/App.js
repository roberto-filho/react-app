import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './layout/Header';
import Content from './layout/Content';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </MuiThemeProvider>
    );
  }
}