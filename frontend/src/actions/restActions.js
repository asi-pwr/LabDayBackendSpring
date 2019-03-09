import axiosInstance from "../helpers/axiosInstance";

export const restActions = {
    restGet,
    restPost,
    restDelete,
};
function restPost(item, endpoint, type) {
    return dispatch => {
        axiosInstance.post(endpoint, JSON.stringify(item))
            .then(post =>{
                dispatch({
                    status: post.status,
                    type: type,
                    data: post.data
                })
            })
    }
}

function restGet(endpoint, type) {
    return dispatch => {
        axiosInstance.get(endpoint)
            .then(response =>{
                dispatch({
                    status: response.status,
                    type: type,
                    data: response.data
                })
            })
    }
}

function restDelete(id, endpoint, type) {
    return dispatch => {
        axiosInstance.delete(endpoint + '/' + id)
            .then(response => {
                dispatch({
                    status: response.status,
                    deletedItem: id,
                    type: type,
                })
            })
    }
}