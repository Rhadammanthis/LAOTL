import {
	SIGN_UP_USER,
	USER_LOGED_IN,
	SET_USER
} from '../actions/types';

const INITIAL_STATE = { 
	userCreatedResponse : null,
	loggedInUser:null
 };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_UP_USER:
			return {...state, userCreatedResponse: action.payload}
		case USER_LOGED_IN:
			return {...state, loggedInUser: action.payload}
		case SET_USER:
			return {...state, loggedInUser: action.payload}
		default:
			return state;
	}
};