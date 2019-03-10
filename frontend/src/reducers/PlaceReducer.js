import {restConstants} from "../constants/restConstants";

const initialState = {
    places: [],
    newPlace: {}
}

export function placeReducer(state = initialState, action) {
    switch (action.type) {
        case restConstants.GET_PLACE_REQUEST:
            return {
                ...state,
                places: action.data
            }
        case restConstants.POST_PLACE_REQUEST:
            return {
                ...state,
                newPlace: action.data
            }
        case restConstants.DELETE_PLACE_REQUEST:
            return {
                ...state,
                status: action.status,
                deletedItemId: action.deletedItem
            }
        default:
            return state
    }
}