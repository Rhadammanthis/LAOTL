import { Animated } from 'react-native';
import {
    FETCH_DATA,
    CHECK_NETWORK
} from '../actions/types';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

const INITIAL_STATE = AppNavigator.router.getStateForAction(NavigationActions.init());

export default (state = INITIAL_STATE, actions) => {

    // if (actions.type === 'Navigation/BACK' && state && state.routes[state.index].routeName === 'HomeScreen') {
    //     return null;
    // }

    const nextState = AppNavigator.router.getStateForAction(actions, state);

    return nextState || state;
};