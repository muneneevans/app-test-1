import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {StatusBar} from 'react-native';

import * as configSelectors from 'store/Configuration/selectors';
import * as authSelectors from 'store/Authentication/selectors';

import Routes from './Routes';
export class RoutesContainer extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <StatusBar
          animated={true}
          backgroundColor={this.props.theme.PRIMARY_COLOR}
          barStyle={'light-content'}
          showHideTransition={'fade'}
        />
        <Routes {...this.props} />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: configSelectors.getTheme(state),
  isUserAuthenticated: authSelectors.getIsUserAuthenticated(state),
  hasShop: authSelectors.getHasShop(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
