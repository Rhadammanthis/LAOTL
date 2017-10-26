import React from 'react';
import { View, Text, UIManager } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
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

const App = ({ dispatch, nav }) => (
    <AppNavigator
        navigation={addNavigationHelpers({
            dispatch,
            state: nav
        })}
    />
);

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigation = connect(mapStateToProps)(App);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default () => (
    <Provider store={store}>
        <AppWithNavigation />
    </Provider>
);