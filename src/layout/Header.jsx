import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
      return (
        <div>
          <AppBar title='Dashboard' />
          <Drawer docked={false} open={this.state.open} />
        </div>
      )
  }
}