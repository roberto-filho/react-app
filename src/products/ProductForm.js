import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    const record_id = parseInt(props.match.params.id, 10);

    this.state = {
      id: record_id || 0,
      code: '',
      name: '',
      description: '',
      edit_mode: false, // TODO create an edit mode
      snackbar: {
        open: false,
        message: ''
      }
    }
  }
  
  handleRequestClose() {
    this.setState({snackbar: {open: false, message: ''}});
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
        .get(`http://localhost:9393/api/products/${this.props.id}`)
        .then(res => {
          this.setState(res.data);
        });
    }
  }

  componentDidMount() {
    this.loadData();
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

  handleSubmit(event) {
    event.preventDefault();
    
    if(!this.isValidPostData(this.state)) {
      return;
    }

    // Send request to the server
    axios.post('http://localhost:9393/api/products', this.getRecord())
      .then(res => {
        // Show success message
        // Clear form fields
        const successMessage = `Successfully saved: [${res.data.id}]`;

        this.setState({
          id: res.data.id,
          code: '',
          name: '',
          description: '',
          snackbar: {
            open: true, 
            message: successMessage
          }
        });
      }).catch(error => {
        // Show error message
        const isValidationError = error.response && error.response.status === 422;
        let errorMessage = isValidationError
          ? JSON.stringify(error.response.data)
          : error.toString();
        
        this.setState({
          snackbar: {
            open: true, 
            message: errorMessage
          }
        });
      });
  }
  
  render() {
    return <div>
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
      <Snackbar
        open={this.state.snackbar.open}
        message={this.state.snackbar.message}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    </div>
  }
};
