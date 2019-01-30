import React from 'react';
import { PropTypes } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

import {Choose, When, Otherwise} from 'react-control-statements';

import { List } from 'immutable';
import EmptyScreen from '../../screens/EmtpyScreen';

export default class SummaryTransactions extends React.PureComponent {

  static propTypes = {
    data: PropTypes.objectOf(List),
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedItems: List(),
      selectAll: false,
    }

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

  getCategoryArray = (categories) => {
    // Check if it's an array
    if (categories instanceof Array) {
      return categories;
    }

    return [categories];
  }

  handleSelectAll = (e, newValue) => {
    
    if (newValue) {
      this.selectAll();
    }
    
    if (!newValue) {
      // Unselect all
      this.setState({
        selectedItems: List(),
        selectAll: newValue,
      });
    }
  }

  selectAll = () => {
    const {data} = this.props;
    // Check all
    // take props.data and set it to selectedItems
    this.setState({
      selectedItems: List(data),
      selectAll: true,
    });
  }

  handleSelectTransaction = (row, event, checked) => {
    let {selectedItems} = this.state;

    if (checked) {
      // Add to the list
      selectedItems = selectedItems.push(row);
    }

    if (!checked) {
      // Remove from the list
      const curentRowIndex = selectedItems
        .findIndex(t => t.index === row.index);
      selectedItems = selectedItems.remove(curentRowIndex);
    }
    // Add this to selected
    this.setState({ selectedItems });
  }

  valueToCol = (moneyNumber) => {
    const negative = moneyNumber < 0;
    return `${negative?'- ':'+ '}R$ ${Math.abs(moneyNumber)}`;
  }

  render() {
    const {data} = this.props;
    const {
      row = {},
      selectAll,
      selectedItems,
    } = this.state;

    const selectedIndexes = selectedItems.map(t => t.index);

    const hasData = data && data.size;

    return (
        <Choose>
          <When condition={hasData}>
            <Table style={{tableLayout: 'auto'}} padding="dense">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selectAll} 
                      onChange={this.handleSelectAll}
                      indeterminate={selectAll && selectedItems.size !== data.size} />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell>VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map( (row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedIndexes.includes(row.index)}
                        onChange={this.handleSelectTransaction.bind(this, row)}
                        />
                    </TableCell>
                    <TableCell>{row.index}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{this.valueToCol(row.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </When>
          <Otherwise>
            <EmptyScreen />
          </Otherwise>
        </Choose>
    );
  }
};
