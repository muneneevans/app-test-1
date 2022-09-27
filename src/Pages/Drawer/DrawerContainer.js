import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as authActions from 'store/Authentication/actions'
import * as authSelectors from 'store/Authentication/selectors'
import Drawer from './Drawer'
export class DrawerContainer extends Component {
	render() {
		return <Drawer {...this.props} logout={this.props.authActions.logout} />
	}
}

const mapStateToProps = (state) => ({
	userDetails: authSelectors.getUserDetails(state),
})

const mapDispatchToProps = (dispatch) => ({
	authActions: bindActionCreators(authActions, dispatch),
})

const DrawerReduxContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(DrawerContainer)

export default (props) => {
	return <DrawerReduxContainer {...props} />
}
