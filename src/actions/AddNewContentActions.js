import {
    NEW_CONTENT_SEARCH,
    NEW_CONTENT_DATA,
    NEW_CONETNT_ADDED,
    CLEAR_NEW_CONTENT_VALUES,
    CHANGE_RESPONSE_COLOR
} from './types'
import { CONTENT_TYPE } from '../components/common/Constants'
import axios from 'axios'

// export const selectEpisode = (episode, navigate) => {
//     console.log(episode.title)
//     navigate('Episode', {title: episode.title, number: episode.number})
//     return {
//         type: SELECTED_EPISODE,
//         payload: episode
//     };
// };

export const clearNewContentValues = () => {
    return {
        type: CLEAR_NEW_CONTENT_VALUES
    }
}

export const addNewContent = (type, data, episodeId, part_of_series) => {

    console.log("Adding content.....")

    var body = {
        data,
        eid: part_of_series != null ? part_of_series : episodeId,
        category: type,
        uid: "-LgDElEfPYMILyZZkAb1",
        part_of_series: part_of_series != null ? true : false
    }

    console.log("READY TO LAUNCH", body)

    return (dispatch) => {
        axios.post('http://192.168.0.105:8080/laotl/notes', body)
            .then((response) => {
                console.log(response);
                dispatch({ type: NEW_CONETNT_ADDED, payload: response });
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({ type: NEW_CONETNT_ADDED, payload: error });
            });
    }
}

export const searchTextChanged = (text) => {

    return {
        type: NEW_CONTENT_SEARCH,
        payload: text
    }

}

export const searchContent = (type, query) => {
    switch (type) {
        case CONTENT_TYPE.MOVIE:

            if (query.includes('www.themoviedb.org')) {
                var splitStart = query.indexOf('movie', 23)
                var splitEnd = query.indexOf('-', splitStart)
                query = query.slice(splitStart + 6, splitEnd)
            }

            console.log(query)

            return (dispatch) => {
                const mdb = require('moviedb')('531aec356bbd54359474847e57c79986');
                console.log("Looking for movie")
                mdb.movieInfo({ id: query }, (err, res) => {
                    err ? console.log('Error', err) : console.log('Data', res)
                    dispatch({ type: NEW_CONTENT_DATA, payload: res });
                });
            }

        case CONTENT_TYPE.BOOK:

            if (query.includes('https://books.google')) {
                var splitStart = query.indexOf('id=')
                var splitEnd = query.indexOf('&', splitStart)
                query = query.slice(splitStart, splitEnd)
            }

            console.log("Book id:" + query)

            return (dispatch) => {
                axios.get("https://www.googleapis.com/books/v1/volumes?q=id:" + query)
                    .then((response) => {
                        console.log(response);
                        dispatch({ type: NEW_CONTENT_DATA, payload: response });
                    })
                    .catch((error) => {
                        console.log(error.response);
                        dispatch({ type: NEW_CONTENT_DATA, payload: error });
                    });
            }

        case CONTENT_TYPE.VIDEO:

            console.log("Book id:" + "https://noembed.com/embed?url=" + query)

            return (dispatch) => {
                axios.get("https://noembed.com/embed?url=" + query)
                    .then((response) => {
                        console.log(response);
                        dispatch({ type: NEW_CONTENT_DATA, payload: response });
                    })
                    .catch((error) => {
                        console.log(error);
                        dispatch({ type: NEW_CONTENT_DATA, payload: error });
                    });
            }

        case CONTENT_TYPE.ARTICLE:

            return (dispatch) => {
                axios.get(query)
                    .then((response) => {
                        console.log(response);
                        dispatch({ type: NEW_CONTENT_DATA, payload: response });
                    })
                    .catch((error) => {
                        console.log(error.response);
                        dispatch({ type: NEW_CONTENT_DATA, payload: error });
                    });
            }



    }
}

export const changeResponseColor = (color) => {
    return {
        type: CHANGE_RESPONSE_COLOR,
        payload: color
    }
}
