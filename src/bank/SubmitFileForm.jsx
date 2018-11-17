import React from 'react';
import Button from '@material-ui/core/Button';
import Upload from 'mdi-material-ui/Upload';
import {post} from 'axios';
import NotificationSystem from 'react-notification-system';

import Transactions from './Transactions';

import { List } from 'immutable';

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      showTable: false,
      trxs: List(),
    }
  }

  componentDidMount() {
    this._notifications = this.refs.notifications;
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
  
  handleFileChange = (event) => {
    // console.log('Logging selected files for upload:');
    // console.log(event.target.files);
    
    this.setState({file: event.target.files[0]})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('file', this.state.file)

    post('/api/bank/upload', formData, { headers: {'content-type': 'multipart/form-data'} })
      .then(res => {
        // Show success message
        // Clear form fields
        const successMessage = `Successfully uploaded file: [${this.state.file.name}]`;

        this.notifyInfo(successMessage);

        this.setState({
          trxs: List(res.data),
          showTable: true
        });

      }).catch(error => {
        // Show error message
        this.notifyError(this.getErrorFromResponse(error));
      });
  }
  
  inputStyle = {
    display: 'none'
  };

  render() {
    const {file: selectedFile, trxs, showTable} = this.state;

    return (
      <div>
        
        <NotificationSystem ref= 'notifications' />

        <form onSubmit={this.handleSubmit}>
          <br />
          <input
            style={this.inputStyle}
            id="button-file"
            type="file"
            onChange={this.handleFileChange} />
          <label htmlFor="button-file">
            <Button variant="contained" component="span" color="secondary">
              <Upload />
              {selectedFile ? selectedFile.name : 'Choose file'}
            </Button>
          </label>
          <br />
          <br />
          <Button 
            variant="contained"
            type="submit"
            color="secondary">
            Upload and read
          </Button>
        </form>

        <Transactions
          data={trxs}
          show={showTable} />

      </div>
    );
  }
};
