import React from 'react'

import {View, Text, RefreshControl, ActivityIndicator} from 'react-native'
import styled, {ThemeConsumer} from 'styled-components'
import IonIcon from 'react-native-vector-icons/Ionicons'

import folderImage from 'assets/images/notifications.png'
import is from 'is_js'

import Header from 'components/MenuHeader'
import Switcher from 'components/Switcher'
import ImageMessage from 'components/ImageMessage'

const Page = styled.View`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Content = styled.ScrollView`
	flex: 1;
	background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`

export default function Home({navigation, refresh}) {
	return (
		<Page>
			<Header
				title="Home"
				menuPress={() => {
					navigation.openDrawer()
				}}
				// secondaryMenu={
				//   <AddCategoryButton
				//     onPress={() => {
				//       navigation.navigate('NewCategory');
				//     }}>
				//     <AddIcon name="ios-add-circle-outline" size={25} />
				//   </AddCategoryButton>
				// }
			/>
			<Content
				refreshControl={
					<RefreshControl refreshing={false} onRefresh={refresh} />
				}>
				<ImageMessage image={folderImage} message="This is the Home page" />
			</Content>
		</Page>
	)
}
