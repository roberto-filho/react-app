import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  loadData = () => {
    axios
      .get('http://localhost:9393/api/products')
      .then(res => {
        this.setState({products: res.data});
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.products.map( (row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <Button
        variant="raised"
        color="primary"
        onClick={this.loadData}>
        Reload
      </Button>
    </div>
  }
};
