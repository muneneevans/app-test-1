import React, {Component} from 'react';
import {connect} from 'react-redux';

import WelcomePage from './WelcomePage';

export class WelcomePageContainer extends Component {
  render() {
    return <WelcomePage {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WelcomePageContainer);
