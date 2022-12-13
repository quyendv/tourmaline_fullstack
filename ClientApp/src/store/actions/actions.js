import {actionTypes} from "./actionTypes";

export const setIsOpenCrePlaylistModal = (setIsOpenCrePlaylistModal) => ({
    type: actionTypes.SET_IS_OPEN_CREPLAYLIST_MODAL,
    setIsOpenCrePlaylistModal

})
export const setIsOpenCommentModal = (setIsOpenCommentModal) => ({
    type: actionTypes.SET_IS_OPEN_COMMENT_MODAL,
    setIsOpenCommentModal
})

export const createPlaylist = (createPlaylist) => ({
    type: actionTypes.CREATE_PLAYLIST,
    createPlaylist
})


export const createAllPlaylist = (createAllPlaylist) => ({
    type : actionTypes.CREATE_ALL_PLAYLIST,
    createAllPlaylist
})