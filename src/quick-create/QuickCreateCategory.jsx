import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';

export default class QuickCreateCategory extends PureComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
    phrase: PropTypes.string,
    open: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      description: '',
    }
  }

  componentDidMount() {
    if (this.state.description !== '') {
      this.setState({description: ''});
    }
  }

  handleCancel = () => {
    this.setState({description: ''});
    this.props.onCancel();
  }

  handleCreate = () => {
    const {description} = this.state;
    // Create the category
    return this.createCategory(description)
      .then(returned => {
        this.props.onCreate(returned.payload);
        this.setState({description: ''});
      })
      .catch(this.onError);
  }

  createCategory = (description) => {
    const {phrase} = this.props;

    // {"id": "4", "description": "posto colombo", "userChosen":true, "phrases": ["COMPRA CARTAO - COMPRA no estabelecimento POSTO COLOMBO          C"]}
    const payload = {
      description: description,
      userChosen: true,
      phrases: [phrase]
    }

    return axios.post('/api/bank/categories', payload)
      .then(data => {
        return {payload: {
          id: data.id,
          ...payload
        }, response: data}
      });
  }

  onError = (error) => {
    console.error(error);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    const {open, onCancel} = this.props;
    const {description} = this.state;

    return (
      <Dialog
          open={open}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={this.handleChange('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}