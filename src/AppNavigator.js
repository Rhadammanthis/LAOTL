import { StackNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from './components/Splash';
import HomeScreen from './components/Home';
import EpisodesList from './components/EpisodesList'

var mainFlow = TabNavigator(
	{
		HomeScreen: {
			screen: HomeScreen,
			navigationOptions: ({ navigation }) => ({
				title: `Featured`,
				headerLeft: null,
				headerTitleStyle: { alignSelf: "center", color: '#F37752' },
				headerStyle: {
					backgroundColor: '#211f19'
				}
			})
		},
		ListScreen: {
			screen: EpisodesList,
			navigationOptions: ({ navigation }) => ({
				title: `Archive`,
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
		}
	}
);
