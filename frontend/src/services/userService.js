import axios from "axios";
import {restConstants} from "../constants/restConstants";

export const userService = {
    login,
    logout
};

function login(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const configUrlEncoded = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    return axios.post(restConstants.apiBaseUrl + '/api/login', params, configUrlEncoded)
        .then(response => { return response.data.token} )
        .then(token => {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username)
            return token;
        });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
}