import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'

import LogIn from 'pages/LogIn'
import WelcomePage from 'pages/WelcomePage'
import SignUpUser from 'pages/SignUpUser'
import PhoneNumber from 'pages/ForgotPassword/PhoneNumber'
import NewPassword from 'pages/ForgotPassword/NewPassword'

import DrawerComponent from 'pages/Drawer'

import Notifications from 'pages/Notifications'
import Settings from 'pages/Settings'

import Home from 'pages/Home'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AppRoute = () => (
	<Drawer.Navigator
		initialRouteName="Home"
		drawerContent={DrawerComponent}
		drawerStyle={{width: '85%'}}>
		<Drawer.Screen
			name="Home"
			component={Home}
			options={{
				headerShown: false,
			}}
		/>

		<Drawer.Screen
			name="Notifications"
			component={Notifications}
			options={{
				headerShown: false,
			}}
		/>

		<Drawer.Screen
			name="Settings"
			component={Settings}
			options={{
				headerShown: false,
			}}
		/>
	</Drawer.Navigator>
)

const WelcomePageRoute = () => (
	<Stack.Navigator initialRouteName="WelcomePage">
		<Stack.Screen
			name="WelcomePage"
			component={WelcomePage}
			options={{
				headerShown: false,
			}}
		/>
		<Stack.Screen
			name="SignUpUser"
			component={SignUpUser}
			options={{
				headerShown: false,
			}}
		/>
		<Stack.Screen
			name="LogIn"
			component={LogIn}
			options={{
				headerShown: false,
			}}
		/>

		<Stack.Screen
			name="ForgotPassword"
			component={ForgotPasswordRoute}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
)

const ForgotPasswordRoute = () => (
	<Stack.Navigator initialRouteName="ForgotPassword">
		<Stack.Screen
			name="PhoneNumber"
			component={PhoneNumber}
			options={{headerShown: false}}
		/>
		<Stack.Screen
			name="NewPassword"
			component={NewPassword}
			options={{headerShown: false}}
		/>
	</Stack.Navigator>
)

const App = (props) => {
	if (props.isUserAuthenticated) {
		return <AppRoute {...props} />
	} else {
		return <WelcomePageRoute />
	}
}

export default App
// export default AppRoute;
