import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';
import {NativeModules} from 'react-native';

let scriptHostname;
let reactotron = {};
if (__DEV__) {
	const Reactotron = require('reactotron-react-native').default; // eslint-disable-line global-require
	const scriptURL = NativeModules.SourceCode.scriptURL;
	scriptHostname = scriptURL.split('://')[1].split(':')[0];

	reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
		.configure({
			name: 'Agency App',
			host: scriptHostname,
		})
		.useReactNative({
			asyncStorage: true, // there are more options to the async storage.
			networking: {
				// optionally, you can turn it off with false.
				host: 'localhost',
				ignoreUrls: /symbolicate/,
			},
			editor: true, // there are more options to editor
			errors: {veto: (stackFrame) => false}, // or turn it off with false
			overlay: false, // just turning off overlay
		})
		.use(reactotronRedux());
	reactotron.connect();
}

export default reactotron;
