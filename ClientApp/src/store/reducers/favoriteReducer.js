import { actionTypes } from '../actions/actionTypes';

const initState = {
    favoriteSongs: [],
};

const favoriteReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FAVORITE:
            return {
                ...state,
                favoriteSongs: action.data,
            };
        case actionTypes.SET_FAVORITE:
            return {
                ...state,
                favoriteSongs: [...state.favoriteSongs, action.id],
            };
        case actionTypes.REMOVE_FAVORITE:
            return {
                ...state,
                favoriteSongs: state.favoriteSongs.filter((item) => item != action.id),
            };

        default:
            return state;
    }
};

export default favoriteReducer;
