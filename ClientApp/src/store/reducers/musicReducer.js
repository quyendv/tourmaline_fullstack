import { actionTypes } from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    recentSong: [],
    commentSongId: null,
    curPlaylist: [],
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

        case actionTypes.SET_CURPLAYLIST:
            return {
                ...state,
                curPlaylist: action.data,
            };

        case actionTypes.ADD_PLAYLIST:
            return {
                ...state,
                curPlaylist: [...state.curPlaylist, action.data],
            };
        default:
            return state;
    }
};
export default musicReducer;
