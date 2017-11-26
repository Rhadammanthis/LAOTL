import { 
    EPISODES_FETCHED,
    SELECTED_EPISODE,
    FADE_NAVBAR
} from '../actions/types';

const INITIAL_STATE = { 
    episodes: null,
    selectedEpisode: null,
    alpha: 0
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EPISODES_FETCHED:
            return { ...state, episodes: action.payload };
        case SELECTED_EPISODE:
            return { ...state, selectedEpisode: action.payload }
        case FADE_NAVBAR:
            // console.log("Alpha ", action.payload)
            return { ...state, alpha: action.payload }
        default:
            return state;
    }
};