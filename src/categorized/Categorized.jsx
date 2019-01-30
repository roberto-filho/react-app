import React, { PureComponent, Fragment } from 'react';

import Paper from '@material-ui/core/Paper';

import NotificationSystem from 'react-notification-system';

import { List } from 'immutable';
import axios from 'axios';
import { Tabs, Tab, Typography } from '@material-ui/core';
import VirtualizedTable from '../components/VirtualizedTable';
import { Choose, When, Otherwise } from 'react-control-statements';
import EmptyScreen from '../screens/EmtpyScreen';
import SummaryTransactions from './table/SummaryTransactions';

export default class Categorized extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      selectedTabData: List(),
      selectedTab: 0,
      selectAll: false,
      data: List()
    }

  }

  componentDidMount() {
    this._notifications = this.refs.notifications;
    this.load(this.props.match.params.id);
  }

  load = (id) => {
    // Load the categories.
    axios.get(`/api/bank/uploaded-headers/${id}/transactions/sort-into-categories`)
      .then(response => this.setState({
        data: List(response.data)
      }));
  }
  
  onError = (error) => {
    this._notifications.addNotification({
      message: error.message,
      level: 'error'
    });
  }

  onChangeTab = (evt, value) => {
    this.setState({
      selectedTab: value,
    })
  }

  /**
   * Cannot wrap the <Tab> in another component
   * because it does not work with material-ui
   * https://github.com/mui-org/material-ui/issues/13267
   */
  renderCategoryTabs = (categories) => {
    return categories.map((category, idx) => {
      return (
        <Tab 
          label={category.description}
          key={idx}
          value={idx} />
      )
    });
  }

  render() {
    const {
      data,
      selectedTab,
    } = this.state;

    const category = data.get(selectedTab);
    const transactions = category && List(category.transactions) || List();

    return (
      <Fragment>
        <NotificationSystem ref= 'notifications' />
        <Paper>
          <Tabs
            value={selectedTab}
            onChange={this.onChangeTab}
            centered
            indicatorColor="primary"
            textColor="primary" >
            {this.renderCategoryTabs(data)}
          </Tabs>
        </Paper>
        <SummaryTransactions
          data={transactions} />
        {/* <VirtualizedTable
          rowCount={transactions.size}
          rowGetter={({ index }) => transactions.get(index)}
          height={400}
          columns={[
            {
              width: 200,
              flexGrow: 1.0,
              label: 'ID',
              dataKey: 'index',
            },
            {
              width: 200,
              flexGrow: 1.0,
              label: 'DATE',
              dataKey: 'date',
            },
            {
              width: 200,
              flexGrow: 1.0,
              label: 'DESCRIPTION',
              dataKey: 'description',
            },
            {
              width: 200,
              flexGrow: 1.0,
              label: 'VALUE',
              dataKey: 'value',
            },
          ]} /> */}
      </Fragment>
    );
  }

  rowGetter = (transactions) => {
    return ({ index }) => {
      return {
        id: 1,
        description: 'teste',
        value: 1,
        index: 3
      };
    };
  }
};
