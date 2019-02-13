import { history } from "../helpers/history";
import {userService} from "../services/userService";
import {alertActions} from "./alertActions";
import {userConstants} from "../constants/userConstants";


export const userActions = {
    login,
    logout
}

function login(username, password) {
    return dispatch => {
        const user = {
            username: username,
            token: ""
        }
        dispatch(request(user));

        user.token = userService.login(username, password)
            .then(
                user => {
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

