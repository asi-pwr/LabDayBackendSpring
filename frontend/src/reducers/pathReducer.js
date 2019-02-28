import {restConstants} from "../constants/restConstants";

const initialState = {
    paths: [],
    newPath: {}
}

export function pathReducer(state = initialState, action) {
    switch (action.type) {
        case restConstants.GET_PATH_REQUEST:
            return {
                ...state,
                paths: action.data
            }
        case restConstants.POST_PATH_REQUEST:
            return {
                ...state,
                newPath: action.data
            }
        default:
            return state
    }
}