import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  toggleDrawer = () => this.setState({drawerOpen: !this.state.drawerOpen});

  go = () => {
    // Programatically navigate to some page
  }

  render() {
      return (
        <div>
          <AppBar title="Dashboard" onLeftIconButtonTouchTap={this.toggleDrawer} />
          <Drawer 
            ref={(component)=>{this.leftDrawer = component;}}
            docked={false}
            open={this.state.drawerOpen}
            onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
          >
            <MenuItem primaryText="Products" onClick={this.go}/>
          </Drawer>
        </div>
      )
  }
}