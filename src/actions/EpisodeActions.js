import {
    SELECTED_EPISODE
} from './types'

export const selectEpisode = (episode, navigate) => {
    console.log(episode.title)
    navigate('Episode')
    return {
        type: SELECTED_EPISODE,
        payload: episode
    };
};
