// import { apiLogin } from '~/services/auth';
import {apiLogin, apiRegister} from "../../services/auth";
import {actionTypes} from '../actions/actionTypes'

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);
        console.log(response)
        if (response.data != null) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: "Invalid Username or PassWord"
            })
        }
    } catch (err) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: "Invalid Username or Password"
        })

    }
};

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload);
        console.log(response)

        if (response.data != null) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
            })
        }
        else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: "Username is already exist"
            })
        }
    } catch (err) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: "Username is already exist"
        })
    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT
})
