import {actionTypes} from "./actionTypes"

export const setCurSongId = (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play = (play) => ({
    type: actionTypes.PLAY,
    play
})
export const setRecent = (data) => ({
    type: actionTypes.SET_RECENT,
    data
})