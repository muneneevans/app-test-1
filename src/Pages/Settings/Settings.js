import React from 'react'
import {
	View,
	Text,
	RefreshControl,
	ActivityIndicator,
	Switch,
	Linking,
	Share,
} from 'react-native'

import styled, {ThemeConsumer} from 'styled-components'
import IonIcon from 'react-native-vector-icons/Ionicons'

import is from 'is_js'
import Header from 'components/MenuHeader'
import Switcher from 'components/Switcher'
import ImageMessage from 'components/ImageMessage'
import folderImage from 'assets/images/folder.png'
import Config from 'react-native-config'

const Page = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Content = styled.ScrollView`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
	padding-horizontal: 0px;
`

const Section = styled.View`
	margin-vertical: 5px;
	margin-horizontal: 5px;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR_LIGHT};
	border-radius: 10px;
	padding-horizontal: 10px;
	padding-vertical: 0px;
`

const SectionHeader = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	color: ${(props) => props.theme.PRIMARY_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_SMALL};
	margin-vertical: 10px;
`

const SettingItem = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-vertical: 5px;
`
const SettingDetailContainer = styled.View`
	padding-right: 10px;
	flex: 1;
`
const SettingItemTitle = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
`
const SettingItemDescription = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
`
const SettingItemIcon = styled(IonIcon)``

const OutlineButtonText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
`
const OutlineButton = styled.TouchableOpacity`
  padding-vertical: 10px
  padding-horizontal: 10px
`
const Divider = styled.View`
	height: 1px;
	background-color: ${(props) => props.theme.BORDER_COLOR};
`

const SettingButtonIcon = styled(IonIcon)`
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`

const ActionContainer = styled.View`
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR_LIGHT};
	border-radius: 10px;
	padding-horizontal: 5px;
`
const Action = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`

const ActionIconContainer = styled.View`
	height: 30px;
	width: 30px;
	border-radius: 5px;
	padding-vertical: 5px;
	padding-horizontal: 5px;
	margin-vertical: 10px;
	margin-horizontal: 0px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	justify-content: center;
	align-items: center;
`
const ChevronIcon = styled(IonIcon)`
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`
const ActionIcon = styled(IonIcon)`
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
`
const ActionContentContainer = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
`

const ActionText = styled.Text`
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	margin-horizontal: 5px;
`

export default function Settings({
	navigation,
	isDarkTheme,
	enableDarkTheme,
	disableDarkTheme,
	logout,
}) {
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: `
          `,
			})
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message)
		}
	}
	return (
		<ThemeConsumer>
			{(theme) => (
				<Page>
					<Header
						title="Settings"
						menuPress={() => {
							navigation.openDrawer()
						}}
					/>
					<Content>
						<Section>
							<ActionContainer>
								<Action onPress={() => {}}>
									<ActionContentContainer>
										<ActionIconContainer>
											<ActionIcon name="people-outline" size={20} />
										</ActionIconContainer>
										<ActionText>Setting Name</ActionText>
									</ActionContentContainer>
									<ChevronIcon name="chevron-forward-outline" size={25} />
								</Action>
								<Action onPress={() => {}}>
									<ActionContentContainer>
										<ActionIconContainer>
											<ActionIcon name="moon-outline" size={20} />
										</ActionIconContainer>
										<ActionText>Dark mode</ActionText>
									</ActionContentContainer>
									{/* <ChevronIcon name="chevron-forward-outline" size={25} /> */}
									<Switch
										trackColor={{
											false: '#767577',
											true: theme.PRIMARY_COLOR_LIGHT,
										}}
										thumbColor={isDarkTheme ? theme.PRIMARY_COLOR : '#f4f3f4'}
										ios_backgroundColor="#3e3e3e"
										onValueChange={() => {
											isDarkTheme ? disableDarkTheme() : enableDarkTheme()
										}}
										value={isDarkTheme}
									/>
								</Action>
							</ActionContainer>
						</Section>
						<Section>
							<ActionContainer>
								<Action onPress={logout}>
									<ActionContentContainer>
										<ActionIconContainer>
											<ActionIcon name="people-outline" size={20} />
										</ActionIconContainer>
										<ActionText>Log out</ActionText>
									</ActionContentContainer>
									<ChevronIcon name="chevron-forward-outline" size={25} />
								</Action>
								<Action onPress={() => {}}>
									<ActionContentContainer>
										<ActionIconContainer>
											<ActionIcon name="people-outline" size={20} />
										</ActionIconContainer>
										<ActionText>{`Environment: ${Config.ENVIRONMENT}`}</ActionText>
									</ActionContentContainer>
									<ChevronIcon name="chevron-forward-outline" size={25} />
								</Action>
								<Action onPress={() => {}}>
									<ActionContentContainer>
										<ActionIconContainer>
											<ActionIcon name="moon-outline" size={20} />
										</ActionIconContainer>
										<ActionText>Dark mode</ActionText>
									</ActionContentContainer>
									<Switch
										trackColor={{
											false: '#767577',
											true: theme.PRIMARY_COLOR_LIGHT,
										}}
										thumbColor={isDarkTheme ? theme.PRIMARY_COLOR : '#f4f3f4'}
										ios_backgroundColor="#3e3e3e"
										onValueChange={() => {
											isDarkTheme ? disableDarkTheme() : enableDarkTheme()
										}}
										value={isDarkTheme}
									/>
								</Action>
							</ActionContainer>
						</Section>
					</Content>
				</Page>
			)}
		</ThemeConsumer>
	)
}
