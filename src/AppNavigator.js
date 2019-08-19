import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from './components/Splash';
import Featured from './components/Featured';
import Archive from './components/Archive';
import Search from './components/Search';
import Episode from './components/Episode'
import AddNew from './components/AddNew'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

var mainFlow = createMaterialTopTabNavigator(
	{
		Featured: {
			screen: Featured,
			navigationOptions: ({ navigation }) => ({
				title: `Featured`,
				headerLeft: null,
				headerTitleStyle: { alignSelf: "center", color: '#F37752' },
				headerStyle: {
					backgroundColor: '#211f19'
				}
			})
		},
		Archive: {
			screen: Archive,
			navigationOptions: ({ navigation }) => ({
				title: `Archive`,
				headerLeft: null,
				headerTitleStyle: { alignSelf: "center", color: '#F37752' },
				headerStyle: {
					backgroundColor: '#211f19'
				}
			})
		},
		Search: {
			screen: Search,
			navigationOptions: ({ navigation }) => ({
				title: `Search`,
				headerLeft: null,
				headerTitleStyle: { alignSelf: "center", color: '#F37752' },
				headerStyle: {
					backgroundColor: '#211f19'
				}
			})
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#F37752',
			indicatorStyle: {
				backgroundColor: '#F6502C'
			},
			style: {
				backgroundColor: '#211f19'
			}
		}
	}
)

const stackNav = createStackNavigator(
	{
		SplashScreen: {
			screen: SplashScreen,
			navigationOptions: {
				header: () => null
			}
		},
		MainFlow: {
			screen: mainFlow,
			navigationOptions: ({ navigation }) => {
				let selected = navigation.state.params && navigation.state.params.selectionState;
				console.log("Selected", navigation)
				console.log("Slection" + selected, selected)
				return ({
					headerStyle: {
						backgroundColor: '#211f19'
					},
					headerTitleStyle:{
						color:"#F37752"
					},
					title: 'Last App On The Left',
					headerLeft: null,
					headerRight: <Icon onPress={() => { navigation.navigate(selected) }} name={"md-contact"} style={{ color: 'grey', fontSize: 30, marginHorizontal: 10 }} />
				})
			}
		},
		Profile: {
			screen: Profile,
			navigationOptions: ({ navigation }) => ({
				header: null
			})
		},
		Episode: {
			screen: Episode,
			navigationOptions: ({ navigation }) => ({
				header: null
			})
		},
		AddNew: {
			screen: AddNew,
			navigationOptions: ({ navigation }) => ({
				header: null
			})
		},
	},{
		headerLayoutPreset:"center",
	}
);

const authStack = createStackNavigator({
	SignUp: {
		screen: SignUp,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
})

export default createAppContainer(createStackNavigator({
	App: stackNav,
	Auth: authStack
},{
    mode: 'modal',
    headerMode: 'none',
}))
