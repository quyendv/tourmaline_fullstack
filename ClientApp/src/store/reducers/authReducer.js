import {actionTypes} from '../actions/actionTypes';

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    isRegisterSuccess: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: '',
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                msg: '',
                token: null,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterSuccess: true
            };
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isRegisterSuccess: false
            };
        default:
            return state;
    }
};

export default authReducer;
