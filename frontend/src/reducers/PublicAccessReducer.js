import { restConstants } from '../constants/restConstants';

const initialState = {
  publicAccessActive: false,
  status: ''
};

export function publicAccessActiveReducer(state = initialState, action) {
  switch (action.type) {
    case restConstants.GET_PUBLIC_ACCESS_ACTIVE:
      return {
        publicAccessActive: action.data.active
      };
    case restConstants.POST_PUBLIC_ACCESS_ACTIVE:
      return {
        ...state,
        publicAccessActive: action.data.active,
        status: action.status
      };
    default:
      return state;
  }
}
