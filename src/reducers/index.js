import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer';
import NavigationReducer from './NavigationReducer';
import EpisodesReducer from './EpisodesReducer';
// import SongListReducer from './SongListReducer'

export default combineReducers({
    splash: SplashReducer,
    nav: NavigationReducer,
    data: EpisodesReducer
    // movieList: MovieListReducer,
    // movieDetail: MovieDetailReducer,
    // songList: SongListReducer
});