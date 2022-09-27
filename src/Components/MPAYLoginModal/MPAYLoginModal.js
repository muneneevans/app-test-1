import React, {useState} from 'react';
import {View, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import styled, {ThemeConsumer} from 'styled-components';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import {useForm, Controller} from 'react-hook-form';

import IonIcon from 'react-native-vector-icons/Ionicons';
import Header from 'components/Header';
import Switcher from 'components/Switcher';

const Wrapper = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const Content = styled.ScrollView`
padding-vertical: 10px
padding-horizontal: 10px
flex: 1;
`;

const PageScrollView = styled.ScrollView`
	padding-bottom: 30;
	padding-horizontal: 20;
`;

const Field = styled.View`
	padding-bottom: 20;
`;

const FieldLabel = styled.Text`
	padding-bottom: 10;
	font-size: ${(props) => props.theme.FONT_SIZE_SMALL};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
`;

const FieldInput = styled.TextInput`
	border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
	border-width: 1px;
	padding-vertical: 6px;
	padding-horizontal: 7px;
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const PhoneSelector = styled.View`  
  padding-vertical: 5px;
  padding-horizontal: 10px;  
  flex-direction: row;
  align-items: center;
  border-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR} 
  border-width: 1px;
  
`;

const PhoneInputContainer = styled.View`
	padding-horizontal: 10px;
	flex-direction: row;
	align-items: center;
	padding-vertical: 0;
`;
const PhoneInputPrefix = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	padding-bottom: 2.2px;
`;
const PhoneInput = styled.TextInput`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	padding: 0px;
	margin-left: 5px;
	flex: 1;
`;

const CountryCodeInput = styled.View`
  border-right-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR_LIGHT}
  border-right-width: 2px;
  `;

const ErrorText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`;

const Footer = styled.View`
	flex: 1;
	padding-vertical: 10;
`;

const SubmitButton = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.PRIMARY_COLOR};
	border-radius: 50px;
	height: 45px;
`;

const SubmitText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
	text-align: center;
`;
const LoadingButton = styled(SubmitButton)`
	padding-vertical: 9;
`;

const LoadingIcon = styled.ActivityIndicator`
	color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
`;

const LoginErrorText = styled.Text`
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	text-align: center;
	padding-bottom: 10px;
	color: ${(props) => props.theme.PRIMARY_COLOR};
`;

const ErrorButton = styled(SubmitButton)`
	background-color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`;

const ForgotPasswordContainer = styled.TouchableOpacity`
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	padding-vertical: 10px;
`;

const ForgotPasswordLink = styled.Text`
	color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
	font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
	font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
	text-decoration: underline;
	text-align: center;
`;

export default function OrderStatusModal({
	close,
	order,
	complete,
	MPAYLoginProcess,
	MPAYLogin,
}) {
	const {control, handleSubmit, errors, watch} = useForm();

	const onSubmit = (data) => {
		MPAYLogin({...data, phoneNumber: `${data.countryCode}${data.phoneNumber}`});
	};

	const [country, setCountry] = useState({
		countryCode: 'KE',
		callingCode: ['254'],
		country: 0,
		cca2: 'KE',
		isVisible: false,
	});
	const [countryModalVisible, setCountryModalVisible] = useState(false);

	return (
		<ThemeConsumer>
			{(theme) => (
				<Wrapper>
					<Header title="Log in" canGoBack goBack={close} canGoBack />
					<Content>
						<Field>
							<FieldLabel>Phone number</FieldLabel>
							<Switcher
								value={errors.phoneNumber?.type}
								required={<ErrorText>This field is required</ErrorText>}
								pattern={
									<ErrorText>Phone number can only contain digits</ErrorText>
								}
								minLength={<ErrorText>Phone number is invalid</ErrorText>}
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
													setCountryModalVisible(true);
												}}
											/>
											<View style={{position: 'absolute', bottom: -60}}>
												<CountryPicker
													countryCodes={['KE']}
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
														setCountry(country);
														onChange(country.callingCode[0]);
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
									<FieldLabel>Password</FieldLabel>
									<Switcher
										value={errors.password?.type}
										required={<ErrorText>This field is required</ErrorText>}
									/>
									<KeyboardAvoidingView behavior={'position'}>
										<FieldInput
											placeholder="password"
											placeholderTextColor={
												theme.PRIMARY_TEXT_PLACE_HOLDER_COLOR
											}
											value={value}
											onChangeText={(value) => onChange(value)}
											secureTextEntry
										/>
									</KeyboardAvoidingView>
								</Field>
							)}
							name="password"
							rules={{required: true}}
							defaultValue=""
						/>

						<Footer>
							<Switcher
								value={MPAYLoginProcess.status}
								IDLE={
									<SubmitButton onPress={handleSubmit(onSubmit)}>
										<SubmitText>Log in</SubmitText>
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
									<React.Fragment>
										<LoginErrorText>{MPAYLoginProcess.error}</LoginErrorText>
										<ErrorButton onPress={handleSubmit(onSubmit)}>
											<SubmitText>Error</SubmitText>
										</ErrorButton>
									</React.Fragment>
								}
							/>
						</Footer>
					</Content>
				</Wrapper>
			)}
		</ThemeConsumer>
	);
}
