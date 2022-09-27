import * as actionTypes from './actionTypes'
import * as processTypes from '../Shared/processTypes'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import is from 'is_js'

const initialState = {
	_backgroundLoginProcess: {status: processTypes.IDLE, attempts: 0},
	_loginProcess: {status: processTypes.IDLE},
	auth: {
		isUserAuthenticated: true,
		token: undefined,
	},
	userDetails: undefined,
	credentials: undefined,

	_fetchStoreTypesProcess: {status: processTypes.IDLE},
	storeTypesResults: {
		currentPage: 0,
		completed: false,
		storeTypes: [],
	},

	_signUpUserProcess: {status: processTypes.IDLE},

	_signUpShopProcess: {status: processTypes.IDLE},
}

const authenticationPersistConfig = {
	key: 'authentication',
	storage: AsyncStorage,
	blacklist: [
		//TODO remove auth from black list
		'auth',
		'_loginProcess',
		'_backgroundLoginProcess',
		'_fetchStoreTypesProcess',
		'_signUpUserProcess',
		'_signUpShopProcess',
	],
}

const authenticationReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		//#region LOG_IN
		case actionTypes.LOG_IN_REQUESTED:
			return {
				...state,
				_loginProcess: {status: processTypes.PROCESSING},
			}

		case actionTypes.LOG_IN_FAILED:
			return {
				...state,
				_loginProcess: {
					status: processTypes.ERROR,
					error: action.payload.error,
				},
			}
		case actionTypes.LOG_IN_RESET: {
			return {
				...state,
				_loginProcess: {status: processTypes.IDLE},
			}
		}
		//#endregion

		//#region BACKGROUND_LOG_IN
		case actionTypes.BACKGROUND_LOG_IN_REQUESTED:
			return {
				...state,
				_backgroundLoginProcess: {
					...state._backgroundLoginProcess,
					status: processTypes.PROCESSING,
				},
			}

		case actionTypes.BACKGROUND_LOG_IN_FAILED:
			return {
				...state,
				_backgroundLoginProcess: {
					...state._backgroundLoginProcess,
					attempts: state._backgroundLoginProcess.attempts + 1,
					status: processTypes.ERROR,
					error: action.payload.error,
				},
			}
		case actionTypes.BACKGROUND_LOG_IN_RESET: {
			return {
				...state,
				_backgroundLoginProcess: {status: processTypes.IDLE},
			}
		}
		case actionTypes.BACKGROUND_LOG_IN_SIGNOUT: {
			return {
				...state,
				_backgroundLoginProcess: {status: processTypes.IDLE},
				auth: {
					isUserAuthenticated: false,
					token: undefined,
				},
			}
		}

		case actionTypes.LOG_OUT_SUCCEEDED:
			return initialState
		//#endregion

		default:
			if (is.existy(action.payload) && is.existy(action.type)) {
				if (action.type.split('.')[0] === 'authentication') {
					return {...state, ...action.payload}
				} else {
					return state
				}
			} else {
				return state
			}
	}
}

export default persistReducer(
	authenticationPersistConfig,
	authenticationReducer,
)
