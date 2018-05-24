import React from 'react';
import { PropTypes } from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.index}</TableRowColumn>
                <TableRowColumn>{row.date}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
                <TableRowColumn>{row.value}</TableRowColumn>
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
