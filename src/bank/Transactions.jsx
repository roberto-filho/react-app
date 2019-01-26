import React from 'react';
import { PropTypes } from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import NotificationSystem from 'react-notification-system';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {Choose, When} from 'react-control-statements';

import QuickCreateCategory from '../quick-create/QuickCreateCategory';
import { List } from 'immutable';
import EmptyScreen from '../screens/EmtpyScreen';

const EMPTY = null;

export default class Transactions extends React.PureComponent {

  static propTypes = {
    data: PropTypes.objectOf(List),
    show: PropTypes.bool,
    hideCategories: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      openCreateCategoryDialog: false,
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

  handleNewCategory = (row) => {
    console.log('clicked!', JSON.stringify(row));

    this.setState({
      openCreateCategoryDialog: true,
      row,
    });
  }

  handleCreateCategoryClose = (action, createdCategory) => {
    if (action === 'canceled') {

    }

    if (action === 'created') {
      const {description} = createdCategory;
      // Notify
      const successMessage = `Successfully created category: [${description}]`;

      this._notifications.addNotification({
        message: successMessage,
        level: 'success'
      });

      // add category to row and set state
      this.setState(prevState => ({
        data: this.state.data,
        row: {
          categories: createdCategory,
        }
      }));
    }

    this.setState({openCreateCategoryDialog: false});
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
    const categoriesArray = this.getCategoryArray(row.categories);
    
    if (!row.categories || row.categories.id === 'x') {
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

  CategoryHeader = (props) => {
    if (props.show) {
      return <TableCell>TAGS</TableCell>;
    } else {
      return EMPTY;
    }
  }

  CategoryCell = (props) => {
    if (props.show) {
      return <TableCell><this.Category row={props.row} /></TableCell>
    } else {
      return EMPTY;
    }
  }

  paperStyle = {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
    marginBottom: "2em",
  };

  render() {
    const {show, data, hideCategories} = this.props;
    const {
      openCreateCategoryDialog,
      row = {},
      selectAll,
      selectedItems,
    } = this.state;

    const selectedIndexes = selectedItems.map(t => t.index);

    const showCategories = hideCategories === undefined || hideCategories === false;

    const hasData = data && data.size;

    return (
      <Paper style={this.paperStyle}>
        <NotificationSystem ref= 'notifications' />
        <Choose>
          <When condition={show && hasData}>
            <Table style={{tableLayout: 'auto'}}>
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
                  <this.CategoryHeader show={showCategories} />
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
                    <this.CategoryCell show={showCategories} row={row} />
                    <TableCell align="right">{this.valueToCol(row.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <QuickCreateCategory
              phrase={row.description}
              onCancel={this.handleCreateCategoryClose.bind(this, 'canceled')}
              onCreate={this.handleCreateCategoryClose.bind(this, 'created')}
              open={openCreateCategoryDialog} />

          </When>
          <When condition={show && !hasData}>
            <EmptyScreen />
          </When>
        </Choose>
      </Paper>
    );
  }
};
