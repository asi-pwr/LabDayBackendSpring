import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const PathActions = {
    getPaths,
    postPath
}

function getPaths() {
    return dispatch => {
        axiosInstance.get('paths')
            .then(response => {
                dispatch({
                    status: response.status,
                    type: restConstants.GET_PATH_REQUEST,
                    data: response.data
                })
            })
    }
}

function postPath(path) {
    return dispatch => {
        axiosInstance.post('/paths', JSON.stringify(path))
            .then(post =>{
                dispatch({
                    type: restConstants.POST_PATH_REQUEST,
                    data: post.data
                })
            })
    }
}

