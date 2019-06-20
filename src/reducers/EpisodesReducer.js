import { 
    EPISODES_FETCHED,
    SELECTED_EPISODE,
    FADE_NAVBAR
} from '../actions/types';

const INITIAL_STATE = { 
    episodes: null,
    selectedEpisode: {
        "category" : "Heavy Hitters",
        "cover_image" : "https://static.stereogum.com/uploads/2011/02/dahmer02-608x433.jpg",
        "description" : "Our series on Jeffrey Dahmer concludes with the his final descent into madness, the murder museum that was his apartment, and his eventual death at the hands of a fellow inmate.",
        "duration" : 3892000,
        "gold_star" : false,
        "labels" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "name" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "name" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "name" : "serial killer",
            "votes" : 0
          }
        },
        "notes" : {
          "movies" : {
            "-LhHXKvwViW9nL7X0OIS" : {
              "director" : "Marc Meyers",
              "id" : 445040,
              "poster" : "https://image.tmdb.org/t/p/original/c6HoPIBcRv9l2tPB8hbivq71Nw.jpg",
              "release_date" : "November 3, 2017",
              "runtime" : 107,
              "title" : "My Friend Dahmer"
            },
            "-LhIVH4XvIEqRD778sZZ" : {
              "director" : "David Jacobson",
              "id" : 25853,
              "poster" : "https://image.tmdb.org/t/p/original/puwSViyVgtB5is1BEITb6mO6ROp.jpg",
              "release_date" : "June 21, 2002",
              "runtime" : 101,
              "title" : "Dahmer"
            },
            "-LhIbVFnhAwScB0BF9vx" : {
              "director" : "Chris James Thompson",
              "id" : 97686,
              "poster" : "https://image.tmdb.org/t/p/original/eIIPonlNZAhAAmcoa1deoHpIFJ7.jpg",
              "release_date" : "February 15, 2013",
              "runtime" : 76,
              "title" : "The Jeffrey Dahmer Files"
            },
            "-LhY6k6XssBLgmybhOMI" : {
              "director" : "David R. Bowen",
              "id" : 47044,
              "poster" : "https://image.tmdb.org/t/p/original/5CcqhTMiBkPArjpXlgLaAGTgYTx.jpg",
              "release_date" : "January 1, 1993",
              "runtime" : 99,
              "title" : "The Secret Life: Jeffrey Dahmer"
            }
          }
        },
        "number" : "124",
        "part_of_series" : "-LhH0z-_AsXuTHkjjaEp",
        "title" : "Dahmer Part III: Paint It White"
      },
    fade: 0
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EPISODES_FETCHED:
            return { ...state, episodes: action.payload };
        case SELECTED_EPISODE:
            return { ...state, selectedEpisode: action.payload, alpha: 0 }
        case FADE_NAVBAR:
            // console.log("Alpha ", action.payload)
            return { ...state, fade: action.payload }
        default:
            return state;
    }
};