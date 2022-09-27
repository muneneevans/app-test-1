import React, {Component} from 'react';
import {connect} from 'react-redux';

import PhoneNumber from './PhoneNumber';

export class PhoneNumberContainer extends Component {
  render() {
    return <PhoneNumber {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneNumberContainer);
