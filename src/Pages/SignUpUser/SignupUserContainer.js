import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as authActions from 'store/Authentication/actions';
import * as authSelectors from 'store/Authentication/selectors';

import SignUpUser from './SignUpUser';
export class SignupUserContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.signUpUserProcess.status !==
        this.props.signUpUserProcess.status &&
      this.props.signUpUserProcess.status === 'ERROR'
    ) {
      setTimeout(() => {
        this.props.authActions.resetSignUpUser();
      }, 2500);
    }
  }
  componentWillUnmount() {
    this.props.authActions.resetSignUpUser();
  }

  render() {
    return (
      <SignUpUser
        {...this.props}
        signUpUser={this.props.authActions.signUpUser}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  signUpUserProcess: authSelectors.getSignUpUserProcess(state),
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupUserContainer);
