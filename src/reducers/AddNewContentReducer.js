import {
    NEW_CONTENT_SEARCH,
    NEW_CONTENT_DATA,
    NEW_CONETNT_ADDED
} from '../actions/types';

const INITIAL_STATE = {
    searchText: "15613",
    searchResult: {},
    contentAddedResponse: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_CONTENT_SEARCH:
            return { ...state, searchText: action.payload };
        case NEW_CONTENT_DATA:
            return { ...state, searchResult: action.payload }
        case NEW_CONETNT_ADDED:
            return { ...state, contentAddedResponse: action.payload }
        default:
            return state;
    }
};