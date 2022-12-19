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
    setIsOpenDeletePlaylistModal: function () {
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
    setIsOpenEditSongModal: function () {
        return 0;
    },
    setIsOpenEditPlaylistModal: function () {
        return 0;
    },
    setInfo: function () {
        return 0;
    },
    setSongAvatar: function () {
        return 0;
    },
    setIsLoadingLogin: function () {
        return 0;
    },
    setIsLoadingRegister: function () {
        return 0;
    },
    setIsOpenLogginModal: function () {
        return 0;
    },
    setPlaylistSong: function () {
        return 0;
    },
    searchResultSong: [],
    searchResultUser: [],
    searchResultPlaylist: [],
    songAvatar: '',
    keyword: null,
    searchResult: [],
    setSongs: function () {
        return 0;
    },
    setPlaylists: function () {
        return 0;
    },
    setUsers: function () {
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
                setIsOpenDeleteModal: action.setIsOpenDeleteModal,
            };
        case actionTypes.SET_IS_OPEN_DELETE_PLAYLIST_MODAL:
            return {
                ...state,
                setIsOpenDeletePlaylistModal: action.setIsOpenDeletePlaylistModal,
            };
        case actionTypes.SET_KEYWORD:
            return {
                ...state,
                keyword: action.keyword,
            };
        case actionTypes.SET_IS_OPEN_EDIT_SONG_MODAL:
            return {
                ...state,
                setIsOpenEditSongModal: action.setIsOpenEditSongModal,
            };
        case actionTypes.SET_IS_OPEN_EDIT_PLAYLIST_MODAL:
            return {
                ...state,
                setIsOpenEditPlaylistModal: action.setIsOpenEditPlaylistModal,
            };
        case actionTypes.SET_INFO:
            return {
                ...state,
                setInfo: action.setInfo,
            };
        case actionTypes.SET_SONG_AVATAR:
            return {
                ...state,
                setSongAvatar: action.setSongAvatar,
            };
        case actionTypes.SET_IS_LOADING_LOGIN:
            return {
                ...state,
                setIsLoadingLogin: action.setIsLoadingLogin,
            };
        case actionTypes.SET_IS_LOADING_REGISTER:
            return {
                ...state,
                setIsLoadingRegister: action.setIsLoadingRegister,
            };
        case actionTypes.SONG_AVATAR:
            return {
                ...state,
                songAvatar: action.songAvatar,
            };
        case actionTypes.SET_IS_OPEN_LOGIN_MODAL:
            return {
                ...state,
                setIsOpenLogginModal: action.setIsOpenLogginModal,
            };
        case actionTypes.SET_PLAYLIST_SONG:
            return {
                ...state,
                setPlaylistSong: action.setPlaylistSong,
            };
        case actionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.searchResult,
            };
        case actionTypes.SET_SEARCH_RESULT_SONG:
            return {
                ...state,
                searchResultSong: action.data,
            };
        case actionTypes.SET_SEARCH_RESULT_PLAYLIST:
            return {
                ...state,
                searchResultPlaylist: action.data,
            };
        case actionTypes.SET_SEARCH_RESULT_USER:
            return {
                ...state,
                searchResultUser: action.data,
            };
        case actionTypes.SET_SEARCH_SONG:
            return {
                ...state,
                setSongs: action.searchSongs,
            };
        case actionTypes.SET_SEARCH_PLAYLIST:
            return {
                ...state,
                setPlaylists: action.searchPlaylist,
            };
        case actionTypes.SET_SEARCH_USER:
            return {
                ...state,
                setUsers: action.searchUser,
            };
        default:
            return state;
    }
};

export default actionsReducer;
