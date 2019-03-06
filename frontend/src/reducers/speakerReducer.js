import {restConstants} from "../constants/restConstants";

const initialState = {
    speakers: [],
    newSpeaker: {}
}

export function speakerReducer(state = initialState, action) {
    switch (action.type) {
        case restConstants.GET_SPEAKER_REQUEST:
            return {
                ...state,
                speakers: action.data
            };
        case restConstants.POST_SPEAKER_REQUEST:
            return {
                ...state,
                newSpeaker: action.data
            };
        case restConstants.DELETE_SPEAKER_REQUEST:
            return {
                ...state,
                status: action.status,
                deletedItemId: action.deletedItem
            };
        default:
            return state;
    }
}