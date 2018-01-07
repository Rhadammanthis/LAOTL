import RNAudioStreamer from 'react-native-audio-streamer';
import {
    TOGGLE_AUDIO_PLAYING,
    AUDIO_CURRENT_TIME
} from './types'

export const toggleAudioPlaying = (episode, audioPlaying, currentEpisodePlaying) => {

    console.log('Episode URL: ', episode.audio_file_url)
    console.log('Is audio playing?: ', audioPlaying)
    console.log('Current episode playing: ', currentEpisodePlaying)

    if (currentEpisodePlaying === episode.number) {
        if (audioPlaying)
            RNAudioStreamer.pause()
        else
            RNAudioStreamer.play()

        audioPlaying = !audioPlaying
    }
    else {
        RNAudioStreamer.setUrl(episode.audio_file_url)
        RNAudioStreamer.play()
        audioPlaying = true
    }

    return {
        type: TOGGLE_AUDIO_PLAYING,
        payload: { number: episode.number, audioPlaying: audioPlaying }
    };
};

export const rewindAudio = (seconds) => {

    return (dispatch) => {

        RNAudioStreamer.currentTime((err, currentTime) => {
            if (!err) console.log(currentTime)

            seconds ? seconds : seconds = 10

            var newTime = currentTime - seconds < 0 ? 0 : currentTime - seconds

            RNAudioStreamer.seekToTime(newTime)

            dispatch({ type: AUDIO_CURRENT_TIME, payload: newTime })
        })
    }
}

export const fastForwardAudio = (seconds) => {

    return (dispatch) => {

        RNAudioStreamer.duration((err, duration) => {
            if (!err) console.log(duration)

            RNAudioStreamer.currentTime((err, currentTime) => {
                if (!err) console.log(currentTime)
                
                seconds ? seconds : seconds = 10

                var newTime = currentTime + seconds > duration ? duration : currentTime + seconds

                RNAudioStreamer.seekToTime(newTime)

                dispatch({ type: AUDIO_CURRENT_TIME, payload: newTime })
            })
        })
    }
}
