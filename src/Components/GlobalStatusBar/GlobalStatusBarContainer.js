import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { SafeAreaView } from 'react-native';

import * as configSelectors from 'store/Configuration/selectors';


// import Routes from './Routes';

export class RoutesContainer extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <SafeAreaView style={{ flex: 0, backgroundColor: this.props.theme.PRIMARY_COLOR }} />
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: configSelectors.getTheme(state),    
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
