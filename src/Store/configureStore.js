import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import reducer from './rootReducer';

// ALERT disable in release build

const middlewares = [thunk];
let store = {};
if (__DEV__) {
	const Reactotron = require('src/../ReactotronConfig').default;
	store = createStore(
		reducer,
		compose(applyMiddleware(...middlewares), Reactotron.createEnhancer()),
	);
} else {
	store = createStore(reducer, compose(applyMiddleware(...middlewares)));
}


export const persistor = persistStore(store);
export default store;
