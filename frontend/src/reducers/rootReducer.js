import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    authentication,
     placeReducer
});

export default rootReducer;