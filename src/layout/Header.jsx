import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

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
            <Toolbar>
              <IconButton style={{marginLeft: -12}} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer 
            anchor="left"
            ref={(component)=>{this.leftDrawer = component;}}
            open={this.state.drawerOpen}
            onClose={() => this.setState({drawerOpen: false})}>
            <Menus toggle={this.toggleDrawer} />
          </Drawer>
        </div>
      )
  }
}