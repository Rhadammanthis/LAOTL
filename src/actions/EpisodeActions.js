import {
    SELECTED_EPISODE,
    EPISODE_TAG_REPORTED,
    EPISODE_TAG_COMMENDED,
    EPISODE_TAG_ADDED
} from './types'
import axios from 'axios'
import { LayoutAnimation } from 'react-native';

export const selectEpisode = (episode, firebaseId, navigate) => {
    console.log(episode.title)
    navigate('Episode', { title: episode.title, number: episode.number, firebaseId: firebaseId })
    return {
        type: SELECTED_EPISODE,
        payload: episode
    };
};

export const commendTag = (eid, uid, tid, sid) => {
    console.log("Report Tag.....")

    var body = {
        eid: sid != null ? sid : eid,
        lid: tid,
        uid: "-LgDElEfPYMILyZZkAb1",
        part_of_series: sid != null ? true : false
    }

    console.log("Body", body)

    return (dispatch) => {
        axios.post('http://192.168.0.102:8080/laotl/voteLabel', body)
            .then((response) => {
                console.log(response);
                dispatch({ type: EPISODE_TAG_COMMENDED, payload: response });
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({ type: NEW_CONETNT_ADDED, payload: error });
            });
    }
};

export const addTag = (eid, uid, title, sid) => {
    console.log("Add Tag.....")

    var body = {
        eid: sid != null ? sid : eid,
        part_of_series: sid != null ? true : false,
        data: {
            created_on: new Date().getTime(),
            creator_id: "-LgDElEfPYMILyZZkAb1",
            title: title,
        }
    }

    console.log("Body", body)

    return (dispatch) => {
        axios.post('http://192.168.0.102:8080/laotl/addLabel', body)
            .then((response) => {
                console.log(response);

                LayoutAnimation.configureNext({
                    duration: 200,
                    create: {
                      type: LayoutAnimation.Types.linear,
                      property: LayoutAnimation.Properties.scaleXY,
                    },
                    update: {
                        type: LayoutAnimation.Types.linear,
                        property: LayoutAnimation.Properties.scaleXY,
                      },
                  })

                dispatch({ type: EPISODE_TAG_ADDED, payload: response });
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({ type: EPISODE_TAG_ADDED, payload: error });
            });
    }
};
