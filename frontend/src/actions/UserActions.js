import { history } from "../helpers/history";
import {userService} from "../services/userService";
import {alertActions} from "./alertActions";
import {userConstants} from "../constants/userConstants";
import axios from "axios";
import {restConstants} from "../constants/restConstants";
import {backendURL} from "../helpers/backendURL";


export const userActions = {
    login,
    logout,
    register,
}

function register(username, password) {
    return dispatch => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const configUrlEncoded = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
        return axios.post( backendURL + '/api/register', params, configUrlEncoded)
            .then(response => {
                dispatch({
                    type: restConstants.POST_USER_REQUEST,
                    data: response.data.id,
                    status: response.status
                })
            })
            .catch(function (error){
                dispatch({
                    type: restConstants.POST_USER_REQUEST,
                    status: error.response.status,
                })
            })
    }
}

function login(username, password) {
    return dispatch => {

        dispatch(request(username));

        userService.login(username, password)
            .then(
                token => {
                    const user = {
                        username: username,
                        token: token
                    }

                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}
    function request(user){
        return { type: userConstants.LOGIN_REQUEST, user }
    }

    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error }
    }

    function logout() {
        userService.logout();
        return { type: userConstants.LOGOUT };
    }

