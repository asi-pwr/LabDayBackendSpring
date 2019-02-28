import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export function restPost(item, endpoint) {
    return dispatch => {

        axiosInstance.post(endpoint, JSON.stringify(item))
            .then(post =>{
                dispatch({
                    status: post.status,
                    type: restConstants.POST_PLACE_REQUEST,
                    data: post.data
                })
            })
    }
}

export function restGet(endpoint) {
    return dispatch => {
        axiosInstance.get(endpoint)
            .then(response =>{
                dispatch({
                    status: response.status,
                    type: restConstants.GET_PLACE_REQUEST,
                    data: response.data
                })
            })
    }
}

export function restDelete(id, endpoint) {
    return dispatch => {
        axiosInstance.delete(endpoint + id)
            .then(response => {
                dispatch({
                    status: response.status,
                    deletedItem: id,
                    type: restConstants.DELETE_PLACE_REQUEST
                })
            })
    }
}