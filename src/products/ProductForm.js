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
      errorSnackbarOpen: false
    }
  }
  
  handleRequestClose() {
    this.setState({errorSnackbarOpen: false});
  }

  getRecord() {
    return {
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

  handleSubmit(event) {
    event.preventDefault();
    var name_ = this.state.name.trim();
    var desc_ = this.state.description.trim();
    // Sanity checks
    if (!name_ || !desc_) {
      return;
    }

    // TODO: send request to the server
    this.setState({name: name_, description: desc_});

    axios.post('http://localhost:9393/api/products', this.getRecord())
      .then(res => {
        this.setState({id: res.data.id});
        // TODO Show success message
        // TODO Clear form fields
      }).catch(error => {
        // TODO Show error message
        this.setState({errorSnackbarOpen: true});
      });
  }
  
  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
      <TextField
          hintText="Code"
          value={this.state.code}
          onChange={this.handleCodeChange}
        />
        <br/>
        <TextField
          hintText="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br/>
        <TextField
          hintText="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <br/>
        <RaisedButton 
          type={'submit'}
          primary={true} 
          label={'Save'}
        />
      </form>
      <Snackbar
        open={this.state.errorSnackbarOpen}
        message="An error occurred."
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    </div>
  }
};
