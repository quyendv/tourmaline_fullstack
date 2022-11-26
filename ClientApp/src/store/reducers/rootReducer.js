import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import authReducer from './authReducer';
import musicReducer from './musicReducer';

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
    key:'music',
    whitelist:['curSongId']
}
const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    music: persistReducer(musicConfig, musicReducer)
});

export default rootReducer;
