import React from 'react';
import logo from './logo.svg';

export default class Header extends React.Component {
    render() {
        return <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React, <br/>this is a demo.</h2>
        </div>
    }
}