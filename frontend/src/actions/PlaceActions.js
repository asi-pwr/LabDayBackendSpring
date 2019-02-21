import axiosInstance from "../helpers/axiosInstance";


export const placeActions = {
    getPlaces,//:TODO
    postPlace
}

function getPlaces() {

}

function postPlace(place) {
    axiosInstance.post('/places', JSON.stringify(place))
        .then(res =>{console.log(res)})
    //TODO: dispatch with response data
}