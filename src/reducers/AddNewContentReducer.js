import {
    NEW_CONTENT_SEARCH,
    NEW_CONTENT_DATA,
    NEW_CONETNT_ADDED,
    CLEAR_NEW_CONTENT_VALUES,
    CHANGE_RESPONSE_COLOR
} from '../actions/types';
import {COLORS} from "../components/common/Constants"

const INITIAL_STATE = {
    searchText: "97686",
    searchResult: {content: null},
    contentAddedResponse: null,
    responseColor: COLORS.BRIGHT_ORANGE
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_CONTENT_SEARCH:
            return { ...state, searchText: action.payload };
        case NEW_CONTENT_DATA:
        //The call to random() is a hacky way of making sure that the state will "always" be different
            return { ...state, searchResult: { content: action.payload, res_code: Math.random() } }
        case NEW_CONETNT_ADDED:
            return { ...state, contentAddedResponse: action.payload, 
                responseColor: action.payload.status === 200 ? COLORS.GREEN : COLORS.RED }
        case CLEAR_NEW_CONTENT_VALUES:
            return { ...INITIAL_STATE }
        case CHANGE_RESPONSE_COLOR:
            return { ...state, responseColor: action.payload}
        default:
            return state;
    }
};