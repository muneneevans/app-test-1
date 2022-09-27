import * as React from 'react';
import { SafeAreaView, View, Text, StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from 'store/configureStore';
import { NavigationContainer } from '@react-navigation/native';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import GlobalStatusBar from "components/GlobalStatusBar"

import Routes from 'src/Routes';

import LoadingPage from 'pages/LoadingPage';
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const onBeforeLift = () => ({});
class StoreApp extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          onBeforeLift={onBeforeLift}
          loading={null}
          persistor={persistor}>
          <GlobalStatusBar />          
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush(codePushOptions)(StoreApp);
