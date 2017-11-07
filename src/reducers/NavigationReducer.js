import { BackHandler, Platform } from 'react-native';
import {
    FETCH_DATA,
    CHECK_NETWORK
} from '../actions/types';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

const INITIAL_STATE = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state = INITIAL_STATE, actions) => {

    //Checks if the application flow is currently in the MainFlow view
    if (actions.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'MainFlow') {
        
        //Check if the platform currently running the app is Android. If so, close the app
        if(Platform.OS === 'android')
            BackHandler.exitApp(); 

        return state;
    }

    const nextState = AppNavigator.router.getStateForAction(actions, state);

    return nextState || state;
};