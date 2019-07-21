import { 
    EPISODES_FETCHED,
    SELECTED_EPISODE,
    EPISODE_TAG_COMMENDED,
    FADE_NAVBAR
} from '../actions/types';

const INITIAL_STATE = { 
    episodes: {
      "-LenrbK_R-8vzNywBgCz" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "tags" : {
          "-LgddF8oEm-ZJT9YliHP" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          }
        },
        "notes" : {
          "articles" : {
            "-LgUeoD7QHfLNgWEA8DK" : {
              "category" : "articles",
              "title" : "Article Title",
              "uid" : "-LgDElEfPYMILyZZkAb1",
              "url" : "http://www.article.com"
            },
            "-LgUfNF55qJx01iad_m5" : {
              "category" : "articles",
              "title" : "Article Title 2",
              "uid" : "-LgDElEfPYMILyZZkAb1",
              "url" : "http://www.article.com"
            }
          },
          "movies" : {
            "-LgUgy5ei7O4ZaamWPZE" : {
              "director" : "Walter Salles",
              "id" : 666,
              "poster" : "https://image.tmdb.org/t/p/original/uQj3kqTPOVnEFnWr7esi90ZyzTm.jpg",
              "release_date" : "November 20, 1998",
              "runtime" : 113,
              "title" : "Central Station"
            },
            "-LgyWfoNtMnV-wXwJmmP" : {
              "director" : "Walter Salles",
              "id" : 666,
              "poster" : "https://image.tmdb.org/t/p/original/uQj3kqTPOVnEFnWr7esi90ZyzTm.jpg",
              "release_date" : "November 20, 1998",
              "runtime" : 113,
              "title" : "Central Station"
            }
          }
        },
        "number" : "1",
        "title" : "Episode"
      },
      "-LgdUw3EvYw-VFrkI5AR" : {
        "tags" : {
          "-LgddP2lpbCkPkUvZf3z" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-LgddVNRVLS8AiOHMtHl" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-Lgde05VtwfCuP3nlj5o" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          }
        }
      },
      "-LgdVq856vsw5b3GMs-s" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "number" : "2",
        "title" : "Episode 2"
      },
      "-Lgd_yUQTb6TJBSITZrS" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "number" : "3",
        "title" : "Episode 3"
      },
      "-LgdaOxtP34oqr0w9jtf" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "number" : "4",
        "title" : "Episode 4"
      },
      "-LgyE_4sNP4WMb2rufDL" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "notes" : {
          "movies" : {
            "-Lgy_LQxqDw7TZ6bdqfJ" : {
              "director" : "Walter Salles",
              "id" : 666,
              "poster" : "https://image.tmdb.org/t/p/original/uQj3kqTPOVnEFnWr7esi90ZyzTm.jpg",
              "release_date" : "November 20, 1998",
              "runtime" : 113,
              "title" : "Central Station"
            }
          }
        },
        "number" : "6",
        "part_of_series" : "-LgdUw3EvYw-VFrkI5AR\"",
        "title" : "Episode 6"
      },
      "-LgyG1SzZpAmCrdfaJ4y" : {
        "category" : "Category 1",
        "cover_image" : "https://static1.squarespace.com/static/5963bd771e5b6c97155e738b/t/5a074fcc24a6942e84c0e168/1510428630458/bar.jpg?format=750w",
        "description" : "Some insightful description",
        "duration" : 3900000,
        "gold_star" : false,
        "notes" : {
          "movies" : {
            "-Lgy_LQxqDw7TZ6bdqfJ" : {
              "director" : "Walter Salles",
              "id" : 666,
              "poster" : "https://image.tmdb.org/t/p/original/uQj3kqTPOVnEFnWr7esi90ZyzTm.jpg",
              "release_date" : "November 20, 1998",
              "runtime" : 113,
              "title" : "Central Station"
            }
          }
        },
        "number" : "7",
        "part_of_series" : "-LgdUw3EvYw-VFrkI5AR",
        "title" : "Episode 7"
      },
      "-LhH48Mjwb2hPtdAftcg" : {
        "category" : "Heavy Hitters",
        "cover_image" : "https://cdn1.thr.com/sites/default/files/imagecache/landscape_928x523/2013/10/Dahmer_a_l.jpg",
        "description" : "On this, the first in a series of three episodes on one of our favorite Heavy Hitters, Jeffrey Dahmer, we cover the man's life from his bizarre and lonely childhood through high school up until his arrival in the great city of Milwaukee.",
        "duration" : 3593000,
        "gold_star" : false,
        "tags" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "serial killer",
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
        "number" : "122",
        "part_of_series" : "-LhH0z-_AsXuTHkjjaEp",
        "series_episodes" : [ "-LgdjSURVAaZD4q17vC1", "-LgyE_4sNP4WMb2rufDL", "-LhH5MUS8NVAyXF1xaOV" ],
        "title" : "Dahmer Part I: Infinity Land"
      },
      "-LhH4wiS26daOvVwd-PV" : {
        "category" : "Heavy Hitters",
        "cover_image" : "https://www.twincities.com/wp-content/uploads/2015/11/20151012__1-GeraldBoyle_JeffreyDahmer.jpg?w=602",
        "description" : "The Dahmer series continues as we cover the bulk of his kills from the blackout beginnings to his eventual dabbling in the chemical arts.",
        "duration" : 4272000,
        "gold_star" : false,
        "tags" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "serial killer",
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
        "number" : "123",
        "part_of_series" : "-LhH0z-_AsXuTHkjjaEp",
        "series_episodes" : [ "-LgdjSURVAaZD4q17vC1", "-LgyE_4sNP4WMb2rufDL", "-LhH5MUS8NVAyXF1xaOV" ],
        "title" : "Dahmer Part II: How To Be Left Alone In The Ghetto"
      },
      "-LhH5MUS8NVAyXF1xaOV" : {
        "category" : "Heavy Hitters",
        "cover_image" : "https://static.stereogum.com/uploads/2011/02/dahmer02-608x433.jpg",
        "description" : "Our series on Jeffrey Dahmer concludes with the his final descent into madness, the murder museum that was his apartment, and his eventual death at the hands of a fellow inmate.",
        "duration" : 3892000,
        "gold_star" : true,
        "tags" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "serial killer",
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
        "series_episodes" : [ "-LgdjSURVAaZD4q17vC1", "-LgyE_4sNP4WMb2rufDL", "-LhH5MUS8NVAyXF1xaOV" ],
        "title" : "Dahmer Part III: Paint It White"
      }
    }
    ,
    series: {
      "-LgdUw3EvYw-VFrkI5AR" : {
        "episodes" : [ "-LgdjSURVAaZD4q17vC1", "-LgyE_4sNP4WMb2rufDL", "-LgyG1SzZpAmCrdfaJ4y" ],
        "tags" : {
          "-LgdgQV3A5L23AmAfQXv" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 2
          },
          "-LgdmJyE9P-mVRWQ4W3N" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-LgdmWn9JQDslHIBOcDe" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-Lgdp6kTd1m2allS8J7g" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-Lgdp9g2RK-FpYiKqw0H" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          },
          "-LgdpBXk8VBKXh8yiBjH" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "Another",
            "votes" : 0
          }
        },
        "notes" : {
          "movies" : {
            "-Lgy_LQxqDw7TZ6bdqfJ" : {
              "director" : "Walter Salles",
              "id" : 666,
              "poster" : "https://image.tmdb.org/t/p/original/uQj3kqTPOVnEFnWr7esi90ZyzTm.jpg",
              "release_date" : "November 20, 1998",
              "runtime" : 113,
              "title" : "Central Station"
            }
          }
        },
        "title" : "My first Series"
      },
      "-LhH0z-_AsXuTHkjjaEp" : {
        "episodes" : [ "-LhH48Mjwb2hPtdAftcg", "-LhH4wiS26daOvVwd-PV", "-LhH5MUS8NVAyXF1xaOV" ],
        "tags" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "serial killer",
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
        "title" : "Jeffrey Dahmer"
      }
    }
    ,
    selectedEpisode: {
        "category" : "Heavy Hitters",
        "cover_image" : "https://static.stereogum.com/uploads/2011/02/dahmer02-608x433.jpg",
        "description" : "Our series on Jeffrey Dahmer concludes with the his final descent into madness, the murder museum that was his apartment, and his eventual death at the hands of a fellow inmate.",
        "duration" : 3892000,
        "gold_star" : true,
        "audio_url" : "https://soundcloud.com/lastpodcastontheleft/episode124-dahmer-part-iii-paint-it-white",
        "tags" : {
          "-LhXxlqvIiS5aun8nNc9" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "jeffrey dahmer",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_0" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "cannibalism",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "serial killer",
            "votes" : 0
          },
          "-LhXxlqvIiS5aun8nNc91" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "wisconsin",
            "votes" : 0
          },
          "-LhXxpUYg_Q7ooczt8_01" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "heavy hitter",
            "votes" : 0
          },
          "-LhXxrhIvZ2q8zw1CzBo1" : {
            "created_on" : 13241689,
            "creator_id" : "-LgDElEfPYMILyZZkAb1",
            "title" : "american",
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
        "series_episodes" : [ "-LgdjSURVAaZD4q17vC1", "-LgyE_4sNP4WMb2rufDL", "-LhH5MUS8NVAyXF1xaOV" ],
        "title" : "Dahmer Part III: Paint It White"
      },
    fade: 0,
    tagCommendedRes: null
 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case EPISODES_FETCHED:
            return { ...state, episodes: action.payload.episodes, series: action.payload.series };
        case SELECTED_EPISODE:
            return { ...state, selectedEpisode: action.payload, alpha: 0 }
        case FADE_NAVBAR:
            // console.log("Alpha ", action.payload)
            return { ...state, fade: action.payload }
        case EPISODE_TAG_COMMENDED:
            return { ...state, tagCommendedRes: action.payload}
        default:
            return state;
    }
};