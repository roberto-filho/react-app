import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import NotificationSystem from 'react-notification-system';

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    const record_id = parseInt(props.match.params.id, 10);

    this.state = {
      id: record_id || 0,
      code: '',
      name: '',
      description: '',
      edit_mode: Boolean(record_id) // TODO create an edit mode
    }
  }

  getRecord() {
    return {
      code: this.state['code'],
      name: this.state['name'],
      description: this.state['description']
    }
  }

  loadData = () => {
    if(this.state.edit_mode) {
      axios
        .get(`/api/products/${this.state.id}`)
        .then(res => {
          this.setState(res.data);
        });
    }
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
  
  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleCodeChange = (event) => {
    this.setState({code: event.target.value});
  }

  isValidPostData(data) {
    const name = data.name.trim();
    const desc = data.description.trim();
    const code = data.code.trim();
    
    // Sanity checks
    return !(!name || !desc || !code);
  }

  getErrorFromResponse(error) {
    const isValidationError = error.response && error.response.status === 422;
    const isError = error.response && error.response.data;
    let errorMessage = isValidationError
      ? JSON.stringify(error.response.data)
      : (isError ? error.response.data : error.toString());

    return errorMessage;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    if(!this.isValidPostData(this.state)) {
      return;
    }

    const isEditing = this.state.edit_mode;

    // Send request to the server
    const url = '/api/products'+(isEditing ? `/${this.state.id}` : '');

    const method = isEditing ? axios.put : axios.post;

    method(url, this.getRecord())
      .then(res => {
        // Show success message
        // Clear form fields
        const successMessage = `Successfully saved: [${this.state.id}] ${this.state.description}`;

        this.notifyInfo(successMessage);

        // TODO If it's in edit mode, redirect to listing
        this.setState({
          id: res.data.id,
          code: '',
          name: '',
          description: '',
          edit_mode: false // Clears edit mode
        });

      }).catch(error => {
        // Show error message
        this.notifyError(this.getErrorFromResponse(error));
      });
  }
  
  render() {
    return <div>
      <NotificationSystem ref="notifications" />
      <form onSubmit={this.handleSubmit}>
      <TextField
          label="Code"
          value={this.state.code}
          onChange={this.handleCodeChange}
        />
        <br/>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br/>
        <TextField
          label="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <br/>
        <br/>
        <Button 
          type="submit"
          color="primary"
          label="Save"
        />
      </form>
    </div>
  }
};
