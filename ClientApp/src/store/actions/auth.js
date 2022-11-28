// import { apiLogin } from '~/services/auth';
import { apiLogin } from "../../services/auth";
import { actionTypes } from '../actions/actionTypes'

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);
        console.log(response)
        if (response.data != null) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data
            })
        }
    } catch (err) {


    }
};

export const logout = () => ({
    type: actionTypes.LOGOUT
})
