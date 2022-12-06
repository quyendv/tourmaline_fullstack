import {actionTypes} from "./actionTypes";

export const openModal = (setIsOpenModal) => ({
    type: actionTypes.SET_IS_OPEN_MODAL,
    setIsOpenModal

})

export const createPlaylist = (createPlaylist) => ({
    type: actionTypes.CREATE_PLAYLIST,
    createPlaylist
})