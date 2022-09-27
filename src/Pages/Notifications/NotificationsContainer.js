import React, {Component} from 'react';
import {connect} from 'react-redux';

import Notifications from './Notifications';
export class NotificationsContainer extends Component {
  render() {
    return <Notifications {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsContainer);
