import React from 'react';
import { PropTypes } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {If} from 'react-control-statements';

export default class Transactions extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.bool
  }

  handleCategories = (categories) => {
    // Check if it's an array
    if (categories instanceof Array) {
      return categories;
    }

    return [categories];
  }

  handleNewCategory = (row) => {
    console.log('clicked!', JSON.stringify(row));
  }

  UncategorizedButton = (params) => {
    const {row} = params;
    // Add a + button to add category
    return (
      <Button
        variant="text"
        color="secondary"
        mini={true}
        onClick={this.handleNewCategory.bind(this, row)}>
        Add
      </Button>
    );
  }

  Category = (params) => {
    const {row} = params;
    const categoriesArray = this.handleCategories(row.categories);
    
    if (row.categories.id === 'x') {
      // It's uncategorized, render the other one
      return (
        <this.UncategorizedButton row={row} />
      )
    } else {
      return categoriesArray.map((c, i) => (
        <Chip key={'c'+i} label={c.description} />
      ));
    }
  }

  render() {
    const {show, data} = this.props;
    return (
      <div>
        <If condition={show}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>TAGS</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map( (row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.index}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell><this.Category row={row} /></TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </If>
      </div>
    );
  }
};
