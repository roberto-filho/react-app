import React from 'react';
import Button from '@material-ui/core/Button';
import Upload from 'mdi-material-ui/Upload';
import {post} from 'axios';
import NotificationSystem from 'react-notification-system';

import Transactions from './Transactions';

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
      showTable: false,
      trxs: []
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
    console.log('Logging selected files for upload:');
    
    console.log(event.target.files);
    
    this.setState({file: event.target.files[0]})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    const url = 'http://localhost:9393/api/bank/upload';

    const formData = new FormData();
    formData.append('file', this.state.file)

    post(url, formData, { headers: {'content-type': 'multipart/form-data'} })
      .then(res => {
        // Show success message
        // Clear form fields
        const successMessage = `Successfully uploaded file: [${this.state.file.name}]`;

        this.notifyInfo(successMessage);

        this.setState({
          trxs: res.data,
          showTable: true
        });

      }).catch(error => {
        // Show error message
        this.notifyError(this.getErrorFromResponse(error));
      });
  }
  
  render() {
    const inputStyle = {
      display: 'none'
    }
    const selectedFile = this.state.file;
    return (
      <div>
        
        <NotificationSystem ref= 'notifications' />

        <form onSubmit={this.handleSubmit}>
          <br />
          <input
            style={inputStyle}
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
          data={this.state.trxs}
          show={this.state.showTable} />

      </div>
    );
  }
};
