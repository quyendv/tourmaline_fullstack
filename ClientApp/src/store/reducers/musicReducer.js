import { actionTypes } from '../actions/actionTypes';

const initState = {
    curSongId: null,
    isPlaying: false,
    recentSong: [],
    commentSongId: null,
    curPlaylist: [],
    nextUpSong: [],
    prevSong: [],
    deleteSongId: null,
    deletePlaylistId: null,
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
        case actionTypes.DELETE_SONG_ID:
            return {
                ...state,
                deleteSongId: action.id,
            };
        case actionTypes.DELETE_PLAYLIST_ID:
            return {
                ...state,
                deletePlaylistId: action.id,
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
        case actionTypes.ADD_TO_NEXTUP:
            let indexOfSongUp = -1;
            state.nextUpSong.forEach((item, index) => {
                if (item.id == action.data.id) {
                    indexOfSongUp = index;
                }
            });

            indexOfSongUp != -1 && state.nextUpSong.splice(indexOfSongUp, 1);
            if (action.data.id == state.curSongId) {
                return state;
            }
            return {
                ...state,
                nextUpSong: [action.data, ...state.nextUpSong],
            };

        case actionTypes.ADD_TO_PREV:
            let indexOfSongPrev = -1;
            state.prevSong.forEach((item, index) => {
                if (item == action.data) {
                    indexOfSongPrev = index;
                }
            });
            indexOfSongPrev != -1 && state.prevSong.splice(indexOfSongPrev, 1);
            return {
                ...state,
                prevSong: [action.data, ...state.prevSong],
            };
        case actionTypes.REMOVE_FROM_PREV:
            return {
                ...state,
                prevSong: state.prevSong.filter((item) => item != action.data),
            };
        case actionTypes.REMOVE_FROM_NEXT_UP:
            return {
                ...state,
                nextUpSong: state.nextUpSong.filter((item) => item.id != action.data),
            };

        default:
            return state;
    }
};
export default musicReducer;
