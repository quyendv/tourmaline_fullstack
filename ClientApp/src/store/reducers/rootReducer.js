import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistReducer} from 'redux-persist';
import authReducer from './authReducer';
import musicReducer from './musicReducer';
import actionsReducer from './actionsReducer';
import userReducer from './userReducer';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token'],
};
const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId','recentSongs']
}
const userConfig = {
    ...commonConfig,
    key: 'user',
    whitelist: ['username']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    music: persistReducer(musicConfig, musicReducer),
    user: persistReducer(userConfig, userReducer),
    actions: actionsReducer

});

export default rootReducer;
