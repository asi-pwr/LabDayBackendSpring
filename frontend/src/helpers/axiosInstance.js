import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://193.33.111.235:5436/admin/api',
    headers: {
        ...(authHeader()),
        'content-type': 'application/json'
    }
})

export function authHeader() {
    const token = localStorage.getItem('token')

    if (token) {
        return { 'Authorization': 'token ' + token };
    } else {
        return {};
    }
}

export default axiosInstance