import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from 'material-ui/TextField';


export default class ProductForm extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const record_id = parseInt(props.match.params.id, 10);

    this.state = {
      id: record_id,
      description: '',
      edit_mode: false
    }
  }

  loadData() {
    if(this.state.edit_mode)
      axios
        .get(`http://localhost:9393/api/products/${this.props.id}`)
        .then(res => {
          this.setState(res.data);
        });
  }

  componentDidMount() {
    this.loadData();
  }

  handleSubmit(event) {
    event.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    // TODO: send request to the server
    this.setState({author: '', text: ''});
  }

  render() {
    return <div>
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Description"
          value={this.state.description}
          onChange={this.handleAuthorChange}
        />
        <br/>
        <RaisedButton 
          primary={true} 
          label={'Reload'}
          onClick={this.loadData}
        />
      </form>
    </div>
  }
};
