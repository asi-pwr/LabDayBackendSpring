import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const placeActions = {
    getPlaces,//:TODO
    postPlace
}

function getPlaces() {

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

