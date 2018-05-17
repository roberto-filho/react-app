import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class Products extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);

    this.state = {
      products: []
    }
  }

  loadData() {
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
      <Table multiSelectable={true}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Code</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.products.map( (row, index) => (
            <TableRow key={index}>
              <TableRowColumn>{row.id}</TableRowColumn>
              <TableRowColumn>{row.code}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.description}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
      <RaisedButton 
        primary={true} 
        label={'Reload'}
        onClick={this.loadData}
      />
    </div>
  }
};
