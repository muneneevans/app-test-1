import React from 'react'
import {View, Text} from 'react-native'
import styled from 'styled-components'
import logoImage from 'assets/images/logos/company-logo.png'

const Page = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
	justify-content: center;
`

const Logo = styled.Image`
	height: 250px;
	width: 250px;
`

const Title = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_EXTRA_LARGE};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`

const TitleContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`

const ButtonsContainer = styled.View`
	align-items: stretch;
	padding-vertical: 30px;
	padding-horizontal: 30px;
`
const Button = styled.TouchableOpacity`
	padding-vertical: 15px;
	margin-vertical: 10px;
	padding-horizontal: 20px;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	flex-direction: row;
	justify-content: center;
	border-radius: 3px;
`

const ButtonText = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`
const OutlineButton = styled.TouchableOpacity`
	padding-vertical: 15px;
	border-radius: 3px;
	margin-vertical: 10px;
	padding-horizontal: 20px;
	border-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-width: 2px;
	flex-direction: row;
	justify-content: center;
`

const OutlineButtonText = styled.Text`
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	color: ${(props) => props.theme.PRIMARY_COLOR};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`

export default function Welcome() {
	return (
		<Page>
			<TitleContainer>
				<Logo source={logoImage} />
				<Title>React native starter kit</Title>
			</TitleContainer>
			<ButtonsContainer>
				<Button>
					<ButtonText>Log in</ButtonText>
				</Button>
				<OutlineButton>
					<OutlineButtonText>Sign up</OutlineButtonText>
				</OutlineButton>
			</ButtonsContainer>
		</Page>
	)
}
