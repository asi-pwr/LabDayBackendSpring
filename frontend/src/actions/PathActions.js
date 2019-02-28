import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const PathActions = {
    getPaths,
    postPath
}

function getPaths() {

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

