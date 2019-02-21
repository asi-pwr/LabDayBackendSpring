import axios from "axios";
import {authHeader} from "../helpers/auth-header";


export const placeActions = {
    getPlaces,//:TODO
    postPlace
}

function getPlaces() {

}

function postPlace(place) {
    const apiBaseUrl = "http://193.33.111.235:5436/admin/api";
    const config = {
        ...(authHeader()),
        'content-type': 'application/json'
    }
    return dispatch => {
        axios.post(apiBaseUrl + '/places', place, config)
            .then(res=>{
            })
            .then(post =>
            dispatch({
                type: 'PLACE_POST',
                payload: post
            }))
    }
}