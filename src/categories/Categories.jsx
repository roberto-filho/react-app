import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NotificationSystem from 'react-notification-system';

import { Choose, When, Otherwise } from 'react-control-statements';

export default class Categories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  loadData = () => {
    axios
      .get('/api/bank/categories')
      .then(res => {
        this.setState({categories: res.data});
        return res;
      })
      .then((res) => {
        if(res.data.length < 1) {
          this.notifyInfo('No data to display.');
        }
      })
      .catch(error => {
        // Show error message
        this.notifyError(this.getErrorFromResponse(error));
      });;
  }

  componentDidMount() {
    this._notifications = this.refs.notifications;
    this.loadData();
  }

  notifyError(message) {
    this._notifications.addNotification({
      message: message,
      level: 'error'
    });
  }

  notifyInfo(message) {
    this._notifications.addNotification({
      message: message,
      level: 'success'
    });
  }

  getErrorFromResponse(error) {
    const isValidationError = error.response && error.response.status === 422;
    const isError = error.response && error.response.data;
    let errorMessage = isValidationError
      ? JSON.stringify(error.response.data)
      : (isError ? error.response.data : error.toString());

    return errorMessage;
  }

  render() {
    return <div>
      <NotificationSystem ref="notifications" />

      <Choose>
        <When condition={this.state.categories.length > 0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Keywords</TableCell>
                <TableCell>Phrases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.categories.map( (row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{JSON.stringify(row.keywords)}</TableCell>
                  <TableCell>{JSON.stringify(row.phrases)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </When>

        <Otherwise>
          <center><h1>NO DATA</h1></center>
        </Otherwise>
      </Choose>
      
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={this.loadData}>
        Reload
      </Button>
    </div>
  }
};
