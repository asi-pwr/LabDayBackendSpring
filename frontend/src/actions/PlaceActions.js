import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const placeActions = {
    getPlaces,
    postPlace,
    deletePlace
}


function postPlace(place) {
    return dispatch => {

        axiosInstance.post('/places', JSON.stringify(place))
            .then(post =>{
                dispatch({
                    status: post.status,
                    type: restConstants.POST_PLACE_REQUEST,
                    data: post.data
                })
            })
    }
}

function getPlaces() {
    return dispatch => {
        axiosInstance.get('/places')
            .then(response =>{
                dispatch({
                    status: response.status,
                    type: restConstants.GET_PLACE_REQUEST,
                    data: response.data
                })
            })
    }
}

function deletePlace(id) {
    return dispatch => {
        axiosInstance.delete('/places/' + id)
            .then(response => {
                dispatch({
                    status: response.status,
                    deletedItem: id,
                    type: restConstants.DELETE_PLACE_REQUEST
                })
            })
    }
}