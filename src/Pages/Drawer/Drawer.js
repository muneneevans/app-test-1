import React from 'react'
import {View, Text} from 'react-native'
import styled from 'styled-components'
import logoImage from 'assets/images/logos/app-logo.png'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {useRoute} from '@react-navigation/native'
import is from 'is_js'

const Wrapper = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Header = styled.ImageBackground`
	padding-vertical: 10px;
	padding-top: 20px;
	padding-horizontal: 10px;
	opacity: 0.7;

	border-bottom-color: ${(props) => props.theme.BORDER_COLOR};
	border-bottom-width: 0.3px;
`

const StoreAvatar = styled.Image`
	height: 80px;
	width: 80px;
	border-radius: 80px;
`
const StoreDetailsContainer = styled.View`
	padding-top: 30px;
	padding-vertical: 10px;
`
const StoreName = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_EXTRA_LARGE};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`
const UserName = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_SMALL};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
`
const Content = styled.ScrollView`
	flex: 1;
`

const Section = styled.View`
	padding-top: 10px;
	padding-vertical: 5px;
	padding-horizontal: 10px;

	border-bottom-color: ${(props) => props.theme.BORDER_COLOR};
	border-bottom-width: 0.3px;
`
const SectionTitle = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
	padding-vertical: 10px;
	padding-horizontal: 10px;
`

const MenuItem = styled.TouchableOpacity`
	flex-direction: row;
	padding-vertical: 10px;
	margin-vertical: 2.5px;
	padding-horizontal: 7.5px;
	align-items: center;
	border-radius: 5px;

	background-color: ${(props) =>
		props.selected
			? props.theme.PRIMARY_COLOR
			: props.theme.PRIMARY_BACKGROUND_COLOR};
`

const MenuIcon = styled(IonIcon)`
	color: ${(props) =>
		props.selected
			? props.theme.PRIMARY_FOREGROUND_COLOR
			: props.theme.PRIMARY_TEXT_COLOR};
`
const MenuTitle = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
	color: ${(props) =>
		props.selected
			? props.theme.PRIMARY_FOREGROUND_COLOR
			: props.theme.PRIMARY_TEXT_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	margin-left: 20px;
`

const MenuListItem = ({
	selected = false,
	title = '',
	icon = 'home',
	iconSelected = 'home',
	onPress = () => {},
}) => {
	return (
		<MenuItem selected={selected} onPress={onPress}>
			<MenuIcon
				selected={selected}
				name={selected ? iconSelected : icon}
				size={20}
			/>
			<MenuTitle selected={selected}>{title}</MenuTitle>
		</MenuItem>
	)
}

export default function Drawer({navigation, logout, userDetails}) {
	const {index, routes} = navigation.getState()
	const currentRoute = routes[index].name

	return (
		<Wrapper>
			<Content>
				<Header
					source={{
						uri:
							'https://images.unsplash.com/photo-1629893250400-a29b567843c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
					}}>
					<StoreAvatar
						source={{
							uri:
								'https://images.unsplash.com/photo-1629893250400-a29b567843c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
						}}
					/>
					<StoreDetailsContainer>
						<StoreName>Name</StoreName>
						<UserName>Name</UserName>
					</StoreDetailsContainer>
				</Header>
				<Section>
					<MenuListItem
						title="Home"
						selected={currentRoute === 'Home'}
						icon={'home-outline'}
						iconSelected={'home'}
						onPress={() => {
							navigation.navigate('Home')
						}}
					/>

					<MenuListItem
						title="Notifications"
						selected={currentRoute === 'Notifications'}
						icon={'notifications-outline'}
						iconSelected={'notifications'}
						onPress={() => {
							navigation.navigate('Notifications')
						}}
					/>
				</Section>

				<Section>
					<SectionTitle>Settings</SectionTitle>

					<MenuListItem
						title="Store settings"
						selected={currentRoute === 'Settings'}
						icon={'settings-outline'}
						iconSelected={'settings'}
						onPress={() => {
							navigation.navigate('Settings')
						}}
					/>
					<MenuListItem
						title="Help"
						selected={currentRoute === 'LogOut'}
						icon={'information-circle-outline'}
						iconSelected={'log-out'}
					/>
					<MenuListItem
						title="Log out"
						selected={currentRoute === 'LogOut'}
						icon={'log-out-outline'}
						iconSelected={'log-out'}
						onPress={() => {
							logout()
						}}
					/>
				</Section>
			</Content>
		</Wrapper>
	)
}
