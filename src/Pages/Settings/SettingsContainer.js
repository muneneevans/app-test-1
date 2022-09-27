import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as configActions from 'store/Configuration/actions'
import * as configSelectors from 'store/Configuration/selectors'
import * as authActions from 'store/Authentication/actions'
import * as authSelectors from 'store/Authentication/selectors'

import Settings from './Settings'

export class SettingsContainer extends Component {
	render() {
		return (
			<Settings
				{...this.props}
				enableDarkTheme={this.props.configActions.enableDarkTheme}
				disableDarkTheme={this.props.configActions.disableDarkTheme}
				logout={this.props.authActions.logout}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	isDarkTheme: configSelectors.getIsDarkTheme(state),
})

const mapDispatchToProps = (dispatch) => ({
	configActions: bindActionCreators(configActions, dispatch),
	authActions: bindActionCreators(authActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
