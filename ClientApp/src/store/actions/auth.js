// import { apiLogin } from '~/services/auth';
import { apiLogin } from "../../services/auth";

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload);
    } catch (err) {}
};
