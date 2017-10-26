import firebase from 'firebase';
import { NetInfo } from 'react-native';
import {
    FETCH_DATA,
    CHECK_NETWORK, 
    EPISODES_FETCHED
} from './types'

export const dataFetch = () => {
    const { currentUser } = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/tracks`)
            .once('value', snapshot => {
                dispatch({ type: EPISODES_FETCHED, payload: snapshot.val() });
                console.log('Called')
            });

    };
};

export const checkNetwork = () => {

    return(dispatch) => {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            dispatch({ type: CHECK_NETWORK, payload: isConnected });
        });
    }

}

