import { actionTypes } from '../actions/actionTypes';

const initState = {
    setIsOpenCrePlaylistModal: function () {
        return 0;
    },
    setIsOpenCommentModal: function () {
        return 0;
    },
    setIsOpenDeleteModal: function () {
        return 0;
    },
    createPlaylist: function () {
        return 0;
    },
    createAllPlaylist: function () {
        return 0;
    },
    setSongUploaded: function () {
        return 0;
    },
};

const actionsReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_OPEN_CREPLAYLIST_MODAL:
            return {
                ...state,
                setIsOpenCrePlaylistModal: action.setIsOpenCrePlaylistModal,
            };

        case actionTypes.CREATE_PLAYLIST:
            return {
                ...state,
                createPlaylist: action.createPlaylist,
            };

        case actionTypes.SET_IS_OPEN_COMMENT_MODAL:
            return {
                ...state,
                setIsOpenCommentModal: action.setIsOpenCommentModal,
            };
        case actionTypes.CREATE_ALL_PLAYLIST:
            return {
                ...state,
                createAllPlaylist: action.createAllPlaylist,
            };
        case actionTypes.SET_SONG_UPLOADED:
            return {
                ...state,
                setSongUploaded: action.setSongUploaded,
            };

        case actionTypes.SET_IS_OPEN_DELETE_MODAL:
            return {
                ...state,
                setIsOpenDeleteModal: action.setIsOpenDeleteModal
            }
        default:
            return state;
    }
};

export default actionsReducer;
