import { StackNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from './components/Splash';
import Featured from './components/Featured';
import Archive from './components/Archive';
import Search from './components/Search';
import Episode from './components/Episode'

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
			navigationOptions: ({ navigation }) => ({
				title: 'Last App On The Left',
			})
		},
		Episode: {
			screen: Episode,
			navigationOptions: ({ navigation }) => ({
				title: `${navigation.state.params.number} - ${navigation.state.params.title}`,
				headerTintColor: '#F6502C',
				headerTitleStyle: { color: '#F37752' },
				headerStyle: {
					backgroundColor: navigation.state.params.color ? navigation.state.params.color : '#211f19'
				},
				header: navigation.state.params.showNavBar ? undefined : null
			})
		},
	}
);
