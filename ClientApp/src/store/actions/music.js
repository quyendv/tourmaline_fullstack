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

export const setCommentSongId = (id) => ({
    type: actionTypes.SET_COMMENT_SONG_ID,
    id
})

export const setCurPlaylist = (data) => ({
    type: actionTypes.SET_CURPLAYLIST,
    data
})

export const addPlaylist = (data) => ({
    type: actionTypes.ADD_PLAYLIST,
    data
})  

export const addToNextUp = (data) => ({
    type: actionTypes.ADD_TO_NEXTUP,
    data
})