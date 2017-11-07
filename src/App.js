import React from 'react';
import { View, Text, UIManager } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { BackHandler } from "react-native";
import AppNavigator from './AppNavigator';

const config = {
    apiKey: "AIzaSyANlaZAfurcjoS8ijDQVpITWnpXn35EobI",
    authDomain: "laotl-f19a0.firebaseapp.com",
    databaseURL: "https://laotl-f19a0.firebaseio.com",
    projectId: "laotl-f19a0",
    storageBucket: "laotl-f19a0.appspot.com",
    messagingSenderId: "846504948766"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ReduxNavigation extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return <AppNavigator navigation={navigation} />;
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(ReduxNavigation);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default () => (
    <Provider store={store}>
        <AppWithNavigation />
    </Provider>
);