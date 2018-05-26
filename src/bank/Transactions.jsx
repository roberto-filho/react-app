import React from 'react';
import { PropTypes } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class Transactions extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    show: PropTypes.bool
  }

  // constructor(props) {
  //   super(props);
  // }

  Transactions = (data) => {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map( (row, index) => (
              <TableRow key={index}>
                <TableCell>{row.index}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  render() {
    return this.props.show ? this.Transactions(this.props.data) : <div />;
  }
};
