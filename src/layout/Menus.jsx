import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "react-router-dom";

export default class Menus extends React.Component {

  render() {
    return ([
    
      <MenuItem key="1" component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText inset primary="Home" />
      </MenuItem>,
  
      <MenuItem key="2" component={Link} to="/products">
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText inset primary="Products" />
      </MenuItem>
    ])
  }
}