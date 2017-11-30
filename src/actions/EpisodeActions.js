import {
    SELECTED_EPISODE,
    FADE_NAVBAR
} from './types'

export const selectEpisode = (episode, navigate) => {
    console.log(episode.title)
    navigate('Episode', {title: episode.title, number: episode.number})
    return {
        type: SELECTED_EPISODE,
        payload: episode
    };
};

export const toggleNavbarFade = (scroll) => {

    var newOpacity;
    
    if(scroll > 175 && scroll < 225){
        newOpacity = (scroll - 175) * 0.02
    }
    else
        if(scroll <= 175)
            newOpacity = 0;
        else
            newOpacity = 1;

    return {
        type: FADE_NAVBAR,
        payload: newOpacity
    }

}
