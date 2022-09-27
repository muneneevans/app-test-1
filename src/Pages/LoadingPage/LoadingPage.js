import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styled from "styled-components"
import appLogo from "assets/images/logos/app-logo.png"

const Page =styled.View`
  flex:1;
  background-color: #F44336;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.Image`
  height: 200px; 
  width: 200px;
`

export default function LoadingPage() {
  return (
    <Page>
      <StatusBar backgroundColor="#F44336" barStyle="dark-content" />
      <Logo source={appLogo}/>
    </Page>
  );
}
