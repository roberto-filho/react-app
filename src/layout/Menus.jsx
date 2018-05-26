import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';

export default class Menus extends React.Component {

  constructor(props) {
    super(props);
    this.toggleDrawer = props.toggle;
  }

  createMenuItem = (keyNumber, linkPath, label, iconChildren) => (
    <MenuItem key={keyNumber} component={Link} to={linkPath} onClick={this.toggleDrawer}>
      <ListItemIcon>
        {iconChildren}
      </ListItemIcon>
      <ListItemText inset primary={label} />
    </MenuItem>
  )

  render() {
    return ([
      this.createMenuItem('1', '/', 'Home', <HomeIcon />),
      this.createMenuItem('2', '/products', 'Products', <DraftsIcon />)
    ])
  }
}