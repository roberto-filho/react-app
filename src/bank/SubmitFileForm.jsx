import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
    const isError = error.response && error.response.data;
    let errorMessage = isValidationError
      ? JSON.stringify(error.response.data)
      : (isError ? error.response.data : error.toString());

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
    return (
      <div>
        
        <NotificationSystem ref= 'notifications' />

        <form onSubmit={this.handleSubmit}>
          <RaisedButton
            containerElement='label'
            label='Arquivo de transações'>
            <input type='file' onChange={this.handleFileChange}/>
          </RaisedButton>
          <br />
          <br />
          <RaisedButton 
            type={'submit'}
            primary={true} 
            label="Upload and read" />
        </form>

        <Transactions
          data={this.state.trxs}
          show={this.state.showTable} />

      </div>
    );
  }
};
