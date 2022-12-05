import { actionTypes } from "../actions/actionTypes";

const initState = {
    setIsOpenModal: function () {
        return 0;
    },
    createPlaylist: function () {
        return 0;
    },
};

const actionsReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_OPEN_MODAL:
            return {
                ...state,
                setIsOpenModal: action.setIsOpenModal,
            };

        case actionTypes.CREATE_PLAYLIST:
            return {
                ...state,
                createPlaylist: action.createPlaylist,
            };
        default:
            return state;
    }
};

export default actionsReducer;
