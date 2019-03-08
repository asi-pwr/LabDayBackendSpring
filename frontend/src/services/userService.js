import axios from "axios";

export const userService = {
    login,
    logout
};

function login(username, password) {
    const apiBaseUrl = "http://193.33.111.235:5436/api";
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const configUrlEncoded = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    return axios.post(apiBaseUrl + '/login', params, configUrlEncoded)
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