import React from 'react';
import { View, Text, UIManager } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { BackHandler, Platform } from "react-native";
import AppNavigator from './AppNavigator';
// import console = require('console');

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

// const AppContainer = createAppContainer(AppNavigator);

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default () => (
    <Provider store={store}>
        <AppNavigator onNavigationStateChange={(prevState, newState, action)=>{
            console.log("PrevState", prevState)
            console.log("NewState", newState)
            console.log("Action", action)
            if(action.type === "Navigation/BACK" && prevState.index === 0 && newState.routes[0].index === 0 && Platform.OS === 'android'){
                BackHandler.exitApp()
            }
        }} />
    </Provider>
)