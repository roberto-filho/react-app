import React from 'react';
import RoutesRenderer from '../routes/RoutesRenderer';

export default class Body extends React.Component {
  render() {
    return <main>
      <RoutesRenderer />
    </main>
  }
}