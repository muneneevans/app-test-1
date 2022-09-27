import React, {useState, useRef} from 'react'

import styled, {ThemeConsumer} from 'styled-components'
import {useForm, Controller} from 'react-hook-form'
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal'
import {ToastAndroid, Platform, Alert, TextInput, View} from 'react-native'
import Header from 'components/Header'

import Switcher from 'components/Switcher'

const Page = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`
const Content = styled.View`
	flex: 1;
	padding-top: 30;
`

const PageScrollView = styled.ScrollView`
	padding-bottom: 30;
	padding-horizontal: 20;
`

const Field = styled.View`
	padding-bottom: 20;
`

const FieldLabel = styled.Text`
	padding-bottom: 10;
	font-size: ${(props) => props.theme.FONT_SIZE_SMALL};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`

const FieldInput = styled.TextInput`
	border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	border-width: 1px;
	padding-vertical: 6px;
	padding-horizontal: 7px;
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`
const PhoneSelector = styled.View`  
  padding-vertical: 5px;
  padding-horizontal: 10px;  
  flex-direction: row;
  align-items: center;
  border-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR} 
  border-width: 1px;
  
`

const PhoneInputContainer = styled.View`
	padding-horizontal: 10px;
	flex-direction: row;
	align-items: center;
	padding-vertical: 0;
`
const PhoneInputPrefix = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	padding-bottom: 2.2px;
`
const PhoneInput = styled.TextInput`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	padding: 0px;
	margin-left: 5px;
	flex: 1;
`

const CountryCodeInput = styled.View`
  border-right-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR_LIGHT}
  border-right-width: 2px;
  `

const ErrorText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`

const Footer = styled.View`
	flex: 1;
	padding-vertical: 10;
`

const SubmitButton = styled.TouchableOpacity`
	padding-vertical: 10;
	padding-horizontal: 20;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-radius: 50px; ;
`

const SubmitText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
`
const LoadingButton = styled(SubmitButton)`
	padding-vertical: 9;
`

const LoadingIcon = styled.ActivityIndicator`
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
`

const ErrorButton = styled(SubmitButton)`
	background-color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`

export default function SignUpUser({
	navigation,
	signUpUser,
	signUpUserProcess,
}) {
	const {control, handleSubmit, errors, watch} = useForm()
	const password = useRef({})
	password.current = watch('password', '')

	const onSubmit = (data) => {
		let firstName = data.fullName.split(' ')[0]
		let lastName = data.fullName.split(' ')[1]
		signUpUser({...data, firstName, lastName})
	}

	const [country, setCountry] = useState({
		countryCode: 'KE',
		callingCode: ['254'],
		country: 0,
		cca2: 'KE',
		isVisible: false,
	})
	const [countryModalVisible, setCountryModalVisible] = useState(false)
	return (
		<ThemeConsumer>
			{(theme) => (
				<Page>
					<Header
						title={'Sign up'}
						canGoBack
						goBack={() => {
							navigation.goBack()
						}}
					/>

					<PageScrollView>
						<Content>
							<Controller
								control={control}
								render={({onChange, onBlur, value}) => (
									<Field>
										<FieldLabel>Full name</FieldLabel>
										<Switcher
											value={errors.fullName?.type}
											required={<ErrorText>This field is required</ErrorText>}
											minLength={
												<ErrorText>
													Enter your full name as it appears in your ID
												</ErrorText>
											}
											pattern={<ErrorText>At least 2 names required</ErrorText>}
										/>
										<FieldInput
											placeholder="Full name"
											placeholderTextColor={
												theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
											}
											value={value}
											onChangeText={(value) => onChange(value)}
											autoCapitalize="words"
										/>
									</Field>
								)}
								name="fullName"
								rules={{required: true, minLength: 5, pattern: /\w+ \w+/i}}
								defaultValue=""
							/>

							<Field>
								<FieldLabel>Phone number</FieldLabel>
								<Switcher
									value={errors.phoneNumber?.type}
									required={<ErrorText>This field is required</ErrorText>}
									pattern={
										<ErrorText>Phone number can only contain digits</ErrorText>
									}
									minLength={<ErrorText>Phone number is invalid</ErrorText>}
									maxLength={<ErrorText>Phone number is invalid</ErrorText>}
								/>
								<PhoneSelector>
									<Controller
										control={control}
										render={({onChange, onBlur, value}) => (
											<CountryCodeInput>
												<FlagButton
													withEmoji={true}
													countryCode={country.cca2}
													onOpen={() => {
														setCountryModalVisible(true)
													}}
												/>
												<View style={{position: 'absolute', bottom: -60}}>
													<CountryPicker
														countryCodes={['KE', 'TZ']}
														withEmoji={true}
														withFlagButton={true}
														withModal
														cca2={country.cca2}
														translation="eng"
														withFlag
														withCallingCode
														placeholder
														onClose={() => setCountryModalVisible(false)}
														onSelect={(country) => {
															setCountry(country)
															onChange(country.callingCode[0])
														}}
														visible={countryModalVisible}
													/>
												</View>
											</CountryCodeInput>
										)}
										name="countryCode"
										defaultValue="254"
									/>
									<Controller
										control={control}
										render={({onChange, onBlur, value}) => (
											<PhoneInputContainer>
												<PhoneInputPrefix>
													{country.callingCode[0]}
												</PhoneInputPrefix>

												<PhoneInput
													rules={{required: true}}
													onBlur={onBlur}
													onChangeText={(value) => onChange(value)}
													value={value}
													placeholder="XXXXXXXX"
													placeholderTextColor={
														theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
													}
													keyboardType="number-pad"
												/>
											</PhoneInputContainer>
										)}
										name="phoneNumber"
										rules={{
											required: true,
											pattern: /^\d+$/,
											minLength: 6,
											maxLength: 9,
										}}
										defaultValue=""
									/>
								</PhoneSelector>
							</Field>

							<Controller
								control={control}
								render={({onChange, onBlur, value}) => (
									<Field>
										<FieldLabel>ID number</FieldLabel>
										<Switcher
											value={errors.IdNumber?.type}
											required={<ErrorText>This field is required</ErrorText>}
											minLength={<ErrorText>ID number</ErrorText>}
										/>
										<FieldInput
											placeholder="ID number"
											placeholderTextColor={
												theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
											}
											value={value}
											onChangeText={(value) => onChange(value)}
											keyboardType="number-pad"
										/>
									</Field>
								)}
								name="IdNumber"
								rules={{required: true, minLength: 7}}
								defaultValue=""
							/>

							<Controller
								control={control}
								render={({onChange, onBlur, value}) => (
									<Field>
										<FieldLabel>Pin</FieldLabel>
										<Switcher
											value={errors.password?.type}
											required={<ErrorText>This field is required</ErrorText>}
											pattern={<ErrorText>Pin must be a number</ErrorText>}
											minLength={<ErrorText>At least 4 digits</ErrorText>}
											maxLength={<ErrorText>Not more than 4 digits</ErrorText>}
										/>
										<FieldInput
											placeholder="password"
											placeholderTextColor={
												theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
											}
											value={value}
											onChangeText={(value) => onChange(value)}
											secureTextEntry
											keyboardType="number-pad"
										/>
									</Field>
								)}
								name="password"
								rules={{
									required: true,
									minLength: 4,
									maxLength: 4,
									pattern: /\d+/i,
								}}
								defaultValue=""
							/>
							<Controller
								control={control}
								render={({onChange, onBlur, value}) => (
									<Field>
										<FieldLabel>Confirm Pin</FieldLabel>
										<Switcher
											value={errors.confirmPassword?.type}
											required={<ErrorText>This field is required</ErrorText>}
											minLength={<ErrorText>At least 4 digits</ErrorText>}
											maxLength={<ErrorText>Not more than 4 digits</ErrorText>}
											validate={<ErrorText>Password do not match</ErrorText>}
										/>
										<FieldInput
											placeholder="password"
											placeholderTextColor={
												theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
											}
											value={value}
											onChangeText={(value) => onChange(value)}
											secureTextEntry
											keyboardType="number-pad"
										/>
									</Field>
								)}
								name="confirmPassword"
								rules={{
									required: true,
									validate: (value) => {
										return (
											value === password.current || 'passwords do not match'
										)
									},
								}}
								defaultValue=""
							/>
							<Footer>
								<Switcher
									value={signUpUserProcess.status}
									IDLE={
										<SubmitButton onPress={handleSubmit(onSubmit)}>
											<SubmitText>Continue</SubmitText>
										</SubmitButton>
									}
									PROCESSING={
										<LoadingButton>
											<LoadingIcon color="#fff" size="large" />
										</LoadingButton>
									}
									SUCCESS={
										<SubmitButton>
											<SubmitText>Success</SubmitText>
										</SubmitButton>
									}
									ERROR={
										<ErrorButton onPress={handleSubmit(onSubmit)}>
											<SubmitText>{signUpUserProcess.error}</SubmitText>
										</ErrorButton>
									}
								/>
							</Footer>
						</Content>
					</PageScrollView>
				</Page>
			)}
		</ThemeConsumer>
	)
}
