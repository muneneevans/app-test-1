import React, {useState} from 'react';
import styled, {ThemeConsumer} from 'styled-components';
import Switcher from 'components/Switcher';
import Header from 'components/Header';
import {useForm, Controller} from 'react-hook-form';

const PageWrapper = styled.View`
  flex: 1;
`;

const PageScrollView = styled.ScrollView`
  padding-horizontal: 20px;
`;

const ParagraphContainer = styled.View`
  padding-vertical: 10px;
`;

const ParagraphText = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_SEMI_BOLD};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`;

const InputsContainer = styled.View`
  padding-bottom: 30px;
`;

const InputContainer = styled.View`
  padding-vertical: 10px;
`;

const InputLabel = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
  padding-vertical: 10px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`;

const Input = styled.TextInput`
    height: 45px;
    border-radius: 6px;
    border-color: ${(props) => props.theme.colors.gray.PRIMARY_COLOR} 
    border-width: 1px;
    padding-left: 20px;
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

const ErrorText = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM - 1};
  padding-bottom: 10px;
  color: ${(props) => props.theme.colors.red.PRIMARY_COLOR};
`;

export default function NewPassword({navigation}) {
  const {control, handleSubmit, errors} = useForm();
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = (data) => {
    navigation.navigate('LogIn');
  };
  return (
    <ThemeConsumer>
      {(theme) => (
        <PageWrapper>
          <Header
            title={'Reset password'}
            canGoBack
            goBack={() => {
              navigation.goBack();
            }}
          />
          <PageScrollView>
            <ParagraphContainer>
              <ParagraphText>
                A one time code has been sent to your phone number. Enter the
                code and set a new password.
              </ParagraphText>
            </ParagraphContainer>

            <InputsContainer>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <InputContainer>
                    <InputLabel>One time code</InputLabel>

                    <Switcher
                      value={errors.code?.type}
                      required={<ErrorText>This code is required</ErrorText>}
                    />

                    <Input
                      onBlur={onBlur}
                      placeholder="Enter the one time code"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  </InputContainer>
                )}
                name="code"
                rules={{
                  required: true,
                }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <InputContainer>
                    <InputLabel>New password</InputLabel>

                    <Switcher
                      value={errors.password?.type}
                      required={<ErrorText>Enter your new password</ErrorText>}
                    />

                    <Input
                      onBlur={onBlur}
                      placeholder="Enter your new password"
                      secureTextEntry={true}
                      keyboardType="number-pad"
                      value={value}
                      onChangeText={(value) => {
                        onChange(value);
                        setNewPassword(value);
                      }}
                    />
                  </InputContainer>
                )}
                name="password"
                rules={{
                  required: true,
                }}
                defaultValue=""
              />

              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <InputContainer>
                    <InputLabel>Confirm password</InputLabel>

                    <Switcher
                      value={errors.confirmPassword?.type}
                      required={
                        <ErrorText>Confirm your new password</ErrorText>
                      }
                      validate={<ErrorText>Passwords do not match</ErrorText>}
                    />

                    <Input
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      secureTextEntry={true}
                      placeholder="Confirm your password"
                      value={value}
                      onChangeText={(value) => onChange(value)}
                    />
                  </InputContainer>
                )}
                name="confirmPassword"
                rules={{
                  required: true,
                  validate: (value) => value === newPassword,
                }}
                defaultValue=""
              />
            </InputsContainer>

            <SubmitButton onPress={handleSubmit(onSubmit)}>
              <SubmitText>Continue</SubmitText>
            </SubmitButton>
          </PageScrollView>
        </PageWrapper>
      )}
    </ThemeConsumer>
  );
}
