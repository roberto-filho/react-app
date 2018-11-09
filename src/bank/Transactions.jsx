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
import {If} from 'react-control-statements';

import QuickCreateCategory from '../quick-create/QuickCreateCategory';
import { List } from 'immutable';

export default class Transactions extends React.Component {

  static propTypes = {
    data: PropTypes.objectOf(List),
    show: PropTypes.bool
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

  handleCategories = (categories) => {
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
    console.log(`row selected ${row.index}`, row);
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

  paperStyle = {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
  };

  render() {
    const {show, data} = this.props;
    const {
      openCreateCategoryDialog,
      row = {},
      selectAll,
      selectedItems,
    } = this.state;

    const selectedIndexes = selectedItems.map(t => t.index);

    return (
      <Paper style={this.paperStyle}>
        <NotificationSystem ref= 'notifications' />
        <If condition={show}>
          <Table>
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
                <TableCell>TAGS</TableCell>
                <TableCell>Value</TableCell>
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
                  <TableCell><this.Category row={row} /></TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <QuickCreateCategory
            phrase={row.description}
            onCancel={this.handleCreateCategoryClose.bind(this, 'canceled')}
            onCreate={this.handleCreateCategoryClose.bind(this, 'created')}
            open={openCreateCategoryDialog} />

        </If>
      </Paper>
    );
  }
};
