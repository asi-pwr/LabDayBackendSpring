import { restConstants } from "../constants/restConstants";

const initialState = {
  paths: [],
  newPath: {},
  deletedPathId: {}
};

export function pathReducer(state = initialState, action) {
  switch (action.type) {
    case restConstants.GET_PATH_REQUEST:
      return {
        ...state,
        paths: action.data
      };
    case restConstants.POST_PATH_REQUEST:
      return {
        ...state,
        newPath: action.data
      };
    case restConstants.DELETE_PATH_REQUEST:
      return {
        ...state,
        deletedPathId: action.data
      };
    default:
      return state;
  }
}
