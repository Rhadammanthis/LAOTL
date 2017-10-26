import { EPISODES_FETCHED } from '../actions/types';

const INITIAL_STATE = { 
    episodes: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EPISODES_FETCHED:
            return { ...state, episodes: action.payload };
        default:
            return state;
    }
};