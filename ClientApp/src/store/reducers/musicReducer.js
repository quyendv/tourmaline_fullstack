import {actionTypes} from "../actions/actionTypes"

const initState = {
    curSongId: null,
    isPlaying: false,
    recentSong: []
}

//TODOS
const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.play
            }
        default:
            return state
    }
}
export default musicReducer