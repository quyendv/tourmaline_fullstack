import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from './constant';

// const token = JSON.parse(localStorage.getItem('persist:auth')).token
const instance = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     // "Authorization" : `Bearer ${token}`
    // }

});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default instance;
