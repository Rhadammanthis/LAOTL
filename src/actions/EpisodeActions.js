import {
    SELECTED_EPISODE,
    FADE_NAVBAR
} from './types'

export const selectEpisode = (episode, firebaseId, navigate) => {
    console.log(episode.title)
    navigate('Episode', {title: episode.title, number: episode.number, firebaseId: firebaseId})
    return {
        type: SELECTED_EPISODE,
        payload: episode
    };
};
