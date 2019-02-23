import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const placeActions = {
    getPlaces,
    postPlace
}


function postPlace(place) {
    return dispatch => {

        axiosInstance.post('/places', JSON.stringify(place))
            .then(post =>{
                dispatch({
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
                    type: restConstants.GET_PLACE_REQUEST,
                    data: response.data
                })
            })
    }
}
