import { StackNavigator, TabNavigator } from 'react-navigation';

import SplashScreen from './components/Splash';
import Featured from './components/Featured';
import Archive from './components/Archive';
import Search from './components/Search';

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
		}
	}
);
