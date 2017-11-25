import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import NotificationSystem from 'react-notification-system';

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);

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

  loadData() {
    if(this.state.edit_mode) {
      axios
        .get(`http://localhost:9393/api/products/${this.state.id}`)
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
  
  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleCodeChange(event) {
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

  handleSubmit(event) {
    event.preventDefault();
    
    if(!this.isValidPostData(this.state)) {
      return;
    }

    const isEditing = this.state.edit_mode;

    // Send request to the server
    const url = 'http://localhost:9393/api/products'+(isEditing ? `/${this.state.id}` : '');

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
          floatingLabelText="Code"
          value={this.state.code}
          onChange={this.handleCodeChange}
        />
        <br/>
        <TextField
          floatingLabelText="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br/>
        <TextField
          floatingLabelText="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <br/>
        <br/>
        <RaisedButton 
          type={'submit'}
          primary={true} 
          label={'Save'}
        />
      </form>
    </div>
  }
};