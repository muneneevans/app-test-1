import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from 'store/Authentication/actions';
import * as authSelectors from 'store/Authentication/selectors';

import LogIn from './LogIn';
export class LogInContainer extends Component {
  //#region lifecycle methods
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.logInProcess.status !== this.props.logInProcess.status &&
      this.props.logInProcess.status === 'ERROR'
    ) {
      setTimeout(() => {
        this.props.authActions.resetLogin();
      }, 2500);
    }
  }
  componentWillUnmount() {
    this.props.authActions.resetLogin();
  }
  //#endregion

  render() {
    return <LogIn {...this.props} logIn={this.props.authActions.login} />;
  }
}

const mapStateToProps = (state) => ({
  logInProcess: authSelectors.getLoginProcess(state),
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);
