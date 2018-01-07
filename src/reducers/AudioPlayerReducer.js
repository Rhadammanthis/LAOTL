import { 
    TOGGLE_AUDIO_PLAYING,
    AUDIO_CURRENT_TIME
} from '../actions/types';

const INITIAL_STATE = { 
    audioPlaying: false,
    currentEpisodePlaying: 0,
    currentTime: 0
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case TOGGLE_AUDIO_PLAYING:
            return { ...state, audioPlaying : action.payload.audioPlaying, currentEpisodePlaying: action.payload.number }
        case AUDIO_CURRENT_TIME:
            return { ...state, currentTime: action.payload}
        default:
            return state;
    }
};