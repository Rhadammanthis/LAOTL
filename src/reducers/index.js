import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer';
import EpisodesReducer from './EpisodesReducer';
import SearchReducer from './SearchReducer'
import AddNewContentReducer from './AddNewContentReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    splash: SplashReducer,
    data: EpisodesReducer,
    search: SearchReducer,
    newContent: AddNewContentReducer,
    user: UserReducer
});