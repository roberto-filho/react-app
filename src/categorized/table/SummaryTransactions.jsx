import React from 'react';
import { PropTypes } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {Choose, When, Otherwise} from 'react-control-statements';
import BigNumber from 'bignumber.js';

import { List } from 'immutable';
import EmptyScreen from '../../screens/EmtpyScreen';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Avatar, Chip, Drawer, Typography } from '@material-ui/core';

export default class SummaryTransactions extends React.PureComponent {

  static propTypes = {
    data: PropTypes.objectOf(List),
  }

  componentDidMount() {
    this._notifications = this.refs.notifications;
  }
  
  onError = (error) => {
    this._notifications.addNotification({
      message: error.message,
      level: 'error'
    });
  }

  valueToCol = (moneyNumber) => {
    const negative = moneyNumber < 0;
    return `${negative?'- ':'+ '}R$ ${Math.abs(moneyNumber)}`;
  }

  renderValueCell = row => (
    <TableCell align="right">
      <Choose>
        <When condition={row.value < 0}>
          <Chip
            //icon={<AddIcon />}
            avatar={<Avatar><RemoveIcon /></Avatar>}
            label={this.valueToCol(row.value)} />
        </When>
        <Otherwise>
          <Chip
            //icon={<AddIcon />}
            avatar={<Avatar><AddIcon /></Avatar>}
            label={this.valueToCol(row.value)} />
        </Otherwise>
      </Choose>
    </TableCell>
  );

  render() {
    const {data} = this.props;
    const hasData = data && data.size;

    // TODO Format these values to have 2 decimal points
    const totalDebit = data
      .filter(row => row.value <= 0)
      .reduce((accumulator,row) => accumulator+Math.abs(row.value), 0);
    const totalCredit = data
      .filter(row => row.value > 0)
      .reduce((accumulator,row) => accumulator+Math.abs(row.value), 0);
    const balance = BigNumber(totalCredit).minus(totalDebit).toNumber();

    return (
        <Choose>
          <When condition={hasData}>
            <Table style={{tableLayout: 'auto'}} padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell>VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map( (row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    {this.renderValueCell(row)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Drawer
              variant="permanent"
              anchor="bottom">
              <Typography variant="overline" style={{height: '30px', 'vertical-align': 'middle'}}>total debits: {totalDebit}</Typography>
              {/* <Typography variant="overline" style={{height: '25px', 'vertical-align': 'middle'}}>total received: {totalCredit}</Typography> */}
              {/* <Typography variant="overline" style={{height: '25px', 'vertical-align': 'middle'}}>balance: {balance}</Typography> */}
              {/* <AddIcon style={{height: '60px'}} /> */}
            </Drawer>
          </When>
          <Otherwise>
            <EmptyScreen />
          </Otherwise>
        </Choose>
    );
  }
};
