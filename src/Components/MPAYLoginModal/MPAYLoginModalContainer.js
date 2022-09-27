import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as accountsActions from 'store/Accounts/actions';
import * as accountsSelectors from 'store/Accounts/selectors';

import MPAYLoginModal from './MPAYLoginModal';
export class MPAYLoginModalContainer extends Component {
	render() {
		return (
			<MPAYLoginModal
				MPAYLogin={this.props.accountsActions.MPAYLogin}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	MPAYLoginProcess: accountsSelectors.getMPAYLoginProcess(state),
});

const mapDispatchToProps = (dispatch) => ({
	accountsActions: bindActionCreators(accountsActions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MPAYLoginModalContainer);
