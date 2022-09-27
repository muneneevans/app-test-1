import {base, colorOptions, darkTheme, lightTheme} from './theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistReducer} from 'redux-persist'
import {LOG_OUT_SUCCEEDED} from 'store/Authentication/actionTypes'
import is from 'is_js'

const initialState = {
	theme: {
		...base,
		...colorOptions.orange,
		...lightTheme,
		colors: colorOptions,
	},
	// theme: {...base, ...colorOptions.red, ...darkTheme, colors: colorOptions},
}

const configurationPersistConfig = {
	key: 'configuration',
	storage: AsyncStorage,
	blacklist: [
		// TODO: Remove theme from blacklist
		'theme',
	],
}

const configurationReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case LOG_OUT_SUCCEEDED:
			return initialState
		default:
			if (is.existy(action.payload) && is.existy(action.type)) {
				if (action.type.split('.')[0] === 'configuration') {
					return {...state, ...action.payload}
				} else {
					return state
				}
			} else {
				return state
			}
	}
}

export default persistReducer(configurationPersistConfig, configurationReducer)
