import { actionTypes } from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    recentSong: [],
    commentSongId: null,
};

//TODOS
const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid,
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.play,
            };
        case actionTypes.SET_RECENT:
            return {
                ...state,
            };
        case actionTypes.SET_COMMENT_SONG_ID:
            return {
                ...state,
                commentSongId: action.id,
            };
        default:
            return state;
    }
};
export default musicReducer;
