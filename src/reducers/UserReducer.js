import {
	SIGN_UP_USER,
	USER_LOGED_IN
} from '../actions/types';

const INITIAL_STATE = { 
	userCreatedResponse : null,
	user:null
 };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_UP_USER:
			return {...state, userCreatedResponse: action.payload}
		case USER_LOGED_IN:
			return {...state, user: action.payload}
		default:
			return state;
	}
};