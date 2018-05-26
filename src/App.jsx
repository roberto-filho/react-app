import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './layout/Header';
import Content from './layout/Body';

export default class App extends Component {

  constructor() {
    super();
    this.theme = createMuiTheme();
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="App">
          <Header />
          <Content />
        </div>
      </MuiThemeProvider>
    );
  }
}