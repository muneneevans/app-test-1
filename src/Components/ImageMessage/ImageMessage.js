import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-horizontal: 5px;
`;

const Image = styled.Image`
  height: ${(props) => (props.small ? '120px' : '180px')};
`;

const MessageText = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
  text-align: center;
`;

const MessageButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  elevation: 2;

  border-radius: 5px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};

  margin-top: 10px;
  padding-vertical: 10px;
  padding-horizontal: 35px;
`;

const MessageButtonText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${(props) => props.theme.PRIMARY_FONT_FAMILY_BOLD};
  font-size: ${(props) => props.theme.FONT_SIZE_MEDIUM};
`;

const ImageMessage = ({
  message = 'Message Text goes here',
  image,
  hasButton = false,
  buttonText,
  onPress,
  small = false,
}) => {
  return (
    <Wrapper>
      <Image resizeMode="contain" source={image} small={small} />
      <MessageText>{message}</MessageText>

      {hasButton && (
        <MessageButton onPress={onPress}>
          <MessageButtonText>{buttonText}</MessageButtonText>
        </MessageButton>
      )}
    </Wrapper>
  );
};

export default ImageMessage;
