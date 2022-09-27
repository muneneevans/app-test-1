import React, {Component} from 'react';
import {connect} from 'react-redux';

import NewPassword from './NewPassword';

export class NewPasswordContainer extends Component {
  render() {
    return <NewPassword {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewPasswordContainer);
