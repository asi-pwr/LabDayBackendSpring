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
            const user = {
                username: username,
                token: token
            };
            return user;
        });
}

function logout() {
    localStorage.removeItem('token');
}

function handleResponse(response) {
    return response.then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if (response.status === 401){
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;

    })
}