import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styled, {ThemeConsumer} from 'styled-components';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.View`
  padding-vertical: 5px;
  padding-horizontal: 10px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};

  elevation: 5;
  shadow-color: black;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 0px 0px;

  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-size: ${(props) => props.theme.FONT_SIZE_LARGE};
  padding-left: 10px;
`;
const HeaderSection = styled.View``;
const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding-vertical: 5px;
  padding-horizontal: 0px;
`;

export default function Header({
  title = 'Header',
  canGoBack = false,
  goBack = () => {},
  menuBar = null,
}) {
  return (
    <Wrapper>
      <TitleContainer>
        {canGoBack && (
          <BackButton onPress={goBack}>
            <ThemeConsumer>
              {(theme) => (
                <IonIcon
                  name="arrow-back"
                  color={theme.PRIMARY_FOREGROUND_COLOR}
                  size={25}
                />
              )}
            </ThemeConsumer>
          </BackButton>
        )}
        <Title>{title}</Title>
      </TitleContainer>
      {menuBar}
    </Wrapper>
  );
}
