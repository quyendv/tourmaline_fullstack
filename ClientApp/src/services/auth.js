import axiosConfig from '../utils/axiosConfig';

export const apiLogin = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/user/login',
                data: payload,
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });

export const apiRegister = (payload) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axiosConfig({
                method: 'post',
                url: '/api/user/register',
                data: payload,
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
