import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NotificationSystem from 'react-notification-system';

import { If, Then, Else } from 'react-if';

export default class Uploads extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploads: []
    }
  }

  loadData = () => {
    axios
      .get('/api/bank/uploaded-headers')
      .then(res => {
        this.setState({uploads: res.data});
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
    const {uploads} = this.state;
    return <div>
      <NotificationSystem ref="notifications" />

      <If condition={uploads.length > 0}>
      <Then>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Date uploaded</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploads.map( (row, index) => (
              <TableRow key={index}>
                <TableCell>{row.accountNumber}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Then>
      <Else>
        <center><h1>NO DATA</h1></center>
      </Else>
      </If>
      
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
