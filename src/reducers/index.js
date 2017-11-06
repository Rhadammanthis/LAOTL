import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer';
import NavigationReducer from './NavigationReducer';
import EpisodesReducer from './EpisodesReducer';
import SearchReducer from './SearchReducer'

export default combineReducers({
    splash: SplashReducer,
    nav: NavigationReducer,
    data: EpisodesReducer,
    search: SearchReducer
    // movieList: MovieListReducer,
    // movieDetail: MovieDetailReducer,
    // songList: SongListReducer
});