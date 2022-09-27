import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

//import all reducers

import authenticationReducer from './Authentication/reducers'
import configurationReducer from './Configuration/reducers'

const persistConfig = {
	key: 'root',
	blacklist: ['authentication', 'configuration'],
	storage: AsyncStorage,
}

const rootReducer = persistReducer(
	persistConfig,
	combineReducers({
		authentication: authenticationReducer,
		configuration: configurationReducer,
	}),
)

export default rootReducer
