import {
    SIGN_UP_USER,
    USER_LOGED_IN,
    SET_USER
} from './types'
import firebase from 'firebase';


export const createUser = (userData) => {

    return (dispatch) => {

        firebase
            .auth()
            .createUserWithEmailAndPassword(userData.Email, userData.Password)
            .then((snapshot) => {

                dispatch({ type: SIGN_UP_USER, payload: "success"});

            })
            .catch(error => {
                dispatch({ type: SIGN_UP_USER, payload: error.message});
            })

    };
};

export const login = (userData) => {

    return (dispatch) => {

        firebase
            .auth()
            .signInWithEmailAndPassword(userData.Email, userData.Password)
            .then((snapshot) => {

                dispatch({ type: USER_LOGED_IN, payload: snapshot});

            })
            .catch(error => {
                dispatch({ type: USER_LOGED_IN, payload: error.message});
            })

    };
};

export const setLoggedUser = (navigator) => {

    return(dispatch) => {

        firebase.auth().onAuthStateChanged((user) => {
            console.log("Got user", user)
            if (user) {
                navigator.setParams({ selectionState: "Profile" })
                dispatch({type: SET_USER, payload: user})
            } else {
                navigator.setParams({ selectionState: "Auth" })
                dispatch({type: SET_USER, payload: null})
            }
        });
    }
}
