import {
	EPISODES_FETCHED,
	SELECTED_EPISODE,
	EPISODE_TAG_COMMENDED,
	EPISODE_TAG_ADDED,
	FADE_NAVBAR
} from '../actions/types';

const INITIAL_STATE = { 
    episodes: null,
    selectedEpisode: null,
    fade: 0,
    tagCommendedRes: null,
	  tagAddedResponse: null
 };

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EPISODES_FETCHED:
			return { ...state, episodes: action.payload.episodes, series: action.payload.series };
		case SELECTED_EPISODE:
			return { ...state, selectedEpisode: action.payload, alpha: 0 }
		case FADE_NAVBAR:
			// console.log("Alpha ", action.payload)
			return { ...state, fade: action.payload }
		case EPISODE_TAG_COMMENDED:
			return { ...state, tagCommendedRes: action.payload }
		case EPISODE_TAG_ADDED:
			var selectedEpisode = state.selectedEpisode;
			selectedEpisode.tags[action.payload.data.firebaseKey] = action.payload.data.data
			return { ...state, tagAddedResponse: action.payload, selectedEpisode: selectedEpisode }
		default:
			return state;
	}
};