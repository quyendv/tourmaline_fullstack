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
export const setSongUploaded = (setSongUploaded) => ({
    type: actionTypes.SET_SONG_UPLOADED,
    setSongUploaded,
})
export const setIsOpenDeleteModal = (setIsOpenDeleteModal) => ({
    type: actionTypes.SET_IS_OPEN_DELETE_MODAL,
    setIsOpenDeleteModal
})
export const setIsOpenDeletePlaylistModal = (setIsOpenDeletePlaylistModal) => ({
    type: actionTypes.SET_IS_OPEN_DELETE_PLAYLIST_MODAL,
    setIsOpenDeletePlaylistModal
})
export const setIsOpenEditSongModal = (setIsOpenEditSongModal) => ({
    type: actionTypes.SET_IS_OPEN_EDIT_SONG_MODAL,
    setIsOpenEditSongModal
})
export const setSearchKeyword = (keyword) => ({
    type: actionTypes.SET_KEYWORD,
    keyword
})

export const setIsOpenEditPlaylistModal = (setIsOpenEditPlaylistModal) => ({
    type: actionTypes.SET_IS_OPEN_EDIT_PLAYLIST_MODAL,
    setIsOpenEditPlaylistModal
})
export const setInfo = (setInfo) => ({
    type: actionTypes.SET_INFO,
    setInfo
})

export const setSongAvatar = (setSongAvatar) => ({
    type: actionTypes.SET_SONG_AVATAR,
    setSongAvatar
})
export const setLoadingLogin = (setIsLoadingLogin) => ({
    type: actionTypes.SET_IS_LOADING_LOGIN,
    setIsLoadingLogin
})

export const SetLoadingRegister = (setIsLoadingRegister) => ({
    type: actionTypes.SET_IS_LOADING_REGISTER,
    setIsLoadingRegister
})
export const songAvatar = (songAvatar) => ({
    type: actionTypes.SONG_AVATAR,
    songAvatar
})
export const setPlaylistInfo = (setPlaylistInfo) => ({
    type: actionTypes.SET_PLAYLIST_INFO,
    setPlaylistInfo
})

export const setIsOpenLogginModal = (setIsOpenLogginModal) => ({
    type: actionTypes.SET_IS_OPEN_LOGIN_MODAL,
    setIsOpenLogginModal
})

export const playlistAvatar = (playlistAvatar) => ({
    type: actionTypes.PLAYLIST_AVATAR,
    playlistAvatar
})
export const playlistInfo = (playlistInfo) => ({
    type: actionTypes.PLAYLIST_INFO,
    playlistInfo
})
export const setPlaylistAvatar = (setPlaylistAvatar) => ({
    type: actionTypes.SET_PLAYLIST_AVATAR,
    setPlaylistAvatar
})