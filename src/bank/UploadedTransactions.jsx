import React from 'react';
import {get} from 'axios';
import NotificationSystem from 'react-notification-system';

import Transactions from './Transactions';

import { List } from 'immutable';
import { Choose, When, Otherwise } from 'react-control-statements';

export default class UploadedTransactions extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      showTable: false,
      trxs: List(),
    }
  }

  componentDidMount() {
    this._notifications = this.refs.notifications;
    this.loadData(this.props.match.params.id);
  }

  loadData(id) {
    get(`/api/bank/uploaded-headers/${id}/transactions`)
      .then(response => {
        if(response.status === 200) {
          this.setState({
            trxs: List(response.data),
            showTable: true
          });
        }
      });
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
    const isError = !!error.response && !!error.response.data;
    let errorMessage = isValidationError
      ? JSON.stringify(error.response.data)
      : (isError ? error.response.data.toString() : error.toString());

    return errorMessage;
  }

  render() {
    const {trxs, showTable} = this.state;

    const hasData = trxs.size > 0;

    return (
      <div>
        
        <NotificationSystem ref='notifications' />

        <Choose>
          <When condition={hasData}>
              <Transactions
                data={trxs}
                show={showTable} />
          </When>
          <Otherwise>
            <center><h1>NO DATA</h1></center>
          </Otherwise>
        </Choose>
      </div>
    );
  }
};
