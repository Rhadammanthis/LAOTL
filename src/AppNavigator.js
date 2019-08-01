import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from './components/Splash';
import Featured from './components/Featured';
import Archive from './components/Archive';
import Search from './components/Search';
import Episode from './components/Episode'
import AddNew from './components/AddNew'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Buffer from './components/SignUp'

var mainFlow = TabNavigator(
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

export default StackNavigator(
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
				console.log("Selected",navigation)
				// console.log("Slection",navigation.state.params.selectionState)
				return ({
					title: 'Last App On The Left',
					headerRight: <Icon onPress={() => { navigation.navigate("Buffer")}} name={"md-contact"} style={{ color: 'grey', fontSize: 30, marginHorizontal: 10 }} />
				})
			}
		},
		Buffer: {
			screen: Buffer,
			navigationOptions: ({ navigation }) => ({
				header: null
			})
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
	}
);
