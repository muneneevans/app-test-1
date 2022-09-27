import React, {useState} from 'react';
import {View} from 'react-native';
import styled, {ThemeConsumer} from 'styled-components';
import {useForm, Controller} from 'react-hook-form';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import Switcher from 'components/Switcher';
import Header from 'components/Header';

const PageWrapper = styled.View`
  flex: 1;
`;

const PageScrollView = styled.ScrollView`
  padding-horizontal: 20px;
`;

const InputContainer = styled.View`
  padding-vertical: 40px;
`;

const InputLabel = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
  padding-vertical: 10px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`;

const ErrorText = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM - 1};
  padding-bottom: 10px;
  color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`;

const PhoneSelector = styled.View`  
  padding-vertical: 8px;
  padding-horizontal: 10px;  
  flex-direction: row;
  align-items: center;
  border-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR} 
  border-width: 1px;
  border-radius: 6px;
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

const SubmitButton = styled.TouchableOpacity`
  height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-radius: 6px;
`;

const SubmitText = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
  color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
  text-align: center;
`;

export default function PhoneNumber({navigation}) {
  const {control, handleSubmit, errors} = useForm();

  const [country, setCountry] = useState({
    countryCode: 'KE',
    callingCode: ['254'],
    country: 0,
    cca2: 'KE',
    isVisible: false,
  });
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const onSubmit = (data) => {
    navigation.navigate('NewPassword');
  };

  return (
    <ThemeConsumer>
      {(theme) => (
        <PageWrapper>
          <Header
            title={'Log in'}
            canGoBack
            goBack={() => {
              navigation.goBack();
            }}
          />
          <PageScrollView>
            <InputContainer>
              <InputLabel>Phone number</InputLabel>
              <Switcher
                value={errors.phoneNumber?.type}
                required={<ErrorText>Your phone number is required</ErrorText>}
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
            </InputContainer>

            <SubmitButton onPress={handleSubmit(onSubmit)}>
              <SubmitText>Continue</SubmitText>
            </SubmitButton>
          </PageScrollView>
        </PageWrapper>
      )}
    </ThemeConsumer>
  );
}
