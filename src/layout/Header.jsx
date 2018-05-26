import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import Menus from "./Menus";

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  toggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});

  render() {
      return (
        <div>
          <AppBar position="static" title="Dashboard">
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </AppBar>
          <Drawer 
            anchor="left"
            ref={(component)=>{this.leftDrawer = component;}}
            open={this.state.drawerOpen}
            onClose={() => this.setState({drawerOpen: false})}>
            <Menus />
          </Drawer>
        </div>
      )
  }
}