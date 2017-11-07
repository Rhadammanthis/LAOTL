import { 
    EPISODES_FETCHED,
    SELECTED_EPISODE
} from '../actions/types';

const INITIAL_STATE = { 
    episodes: null,
    selectedEpisode: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EPISODES_FETCHED:
            return { ...state, episodes: action.payload };
        case SELECTED_EPISODE:
            return { ...state, selectedEpisode: action.payload}
        default:
            return state;
    }
};