import { actionTypes } from "../actions/actionTypes"

const initState = {
    curSongId: null,
    isPlaying: false
}

//TODOS
const musicReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CUR_SONG_ID: 
            return state
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