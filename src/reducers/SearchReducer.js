import { SEARCH_CHANGED, SEARCH_RESULTS } from '../actions/types';

const INITIAL_STATE = { 
    searchText: '',
    searchResults: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SEARCH_CHANGED:
            return { ...state, searchText: action.payload };
        case SEARCH_RESULTS:
            return { ...state, searchResults: action.payload };
        default:
            return state;
    }
};