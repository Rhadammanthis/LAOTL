import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer';
import NavigationReducer from './NavigationReducer';
import EpisodesReducer from './EpisodesReducer';
import SearchReducer from './SearchReducer'
import AddNewContentReducer from './AddNewContentReducer'

export default combineReducers({
    splash: SplashReducer,
    nav: NavigationReducer,
    data: EpisodesReducer,
    search: SearchReducer,
    newContent: AddNewContentReducer
});