import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MenuHeader from './MenuHeader';

export class MenuHeaderContainer extends Component {
  render() {
    return <MenuHeader {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuHeaderContainer);
