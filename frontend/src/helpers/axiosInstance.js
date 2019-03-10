import axios from "axios";
import {backendURL} from "./backendURL";

const axiosInstance = axios.create({
    baseURL: backendURL + '/admin/api',
    headers: axiosHeaders()
});

export function authHeader() {
    const token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': 'token ' + token };
    } else {
        return {};
    }
}

function axiosHeaders() {
    return {
        ...(authHeader()),
        'content-type': 'application/json'
    }
}

axiosInstance.interceptors.request.use(function(config) {
    if(config.headers.Authorization === undefined) {
        config.headers = axiosHeaders()
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance