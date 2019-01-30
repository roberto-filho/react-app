import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NotificationSystem from 'react-notification-system';

import { Choose, When, Otherwise } from 'react-control-statements';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import EmptyScreen from '../screens/EmtpyScreen';

export default class Uploads extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploads: []
    }
  }

  loadData = (isReload) => {
    axios
      .get('/api/bank/uploaded-headers')
      .then(res => {
        this.setState({uploads: res.data});
        return res;
      })
      .then((res) => {
        if(res.data.length < 1) {
          this.notifyInfo('No data to display.');
        } else if(isReload) {
          this.notifyInfo('Refreshed.');
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

  renderRowButtons = (row) => {
    return (
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            mini={true}
            component={Link}
            to={`/uploads/${row._id}/categorized`}>
            Categorized
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="text"
            color="secondary"
            mini={true}
            component={Link}
            to={`/uploads/${row._id}`}>
            Show
          </Button>
        </Grid>
      </Grid>
    )
  }

  render() {
    const {uploads} = this.state;
    return <Fragment>
      <NotificationSystem ref="notifications" />

      <Choose>
        <When condition={uploads.length > 0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Start date</TableCell>
                <TableCell>End date</TableCell>
                <TableCell>Date uploaded</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploads.map( (row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.accountNumber}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    {this.renderRowButtons(row)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </When>
        <Otherwise>
          <EmptyScreen />
        </Otherwise>
      </Choose>
      
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={this.loadData.bind(this, true)}>
        Reload
      </Button>
    </Fragment>
  }
};
