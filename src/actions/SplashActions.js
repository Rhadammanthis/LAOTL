import firebase from 'firebase';
import { NetInfo } from 'react-native';
import {
    FETCH_DATA,
    CHECK_NETWORK,
    EPISODES_FETCHED
} from './types'

export const dataFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/episodes`)
            .once('value', episodeSnapshot => {

                firebase.database().ref(`/series`)
                    .once('value', seriesSnapshot => {
                        dispatch({ type: EPISODES_FETCHED, payload: {episodes: episodeSnapshot.val(), series: seriesSnapshot.val()} });
                        console.log('Called')
                    });
            });

    };
};

export const checkNetwork = () => {

    return (dispatch) => {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            dispatch({ type: CHECK_NETWORK, payload: isConnected });
        });
    }

}

