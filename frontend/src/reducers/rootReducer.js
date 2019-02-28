import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";
import {pathReducer} from "./pathReducer";

const rootReducer = combineReducers({
    authentication,
    placeReducer,
    pathReducer
});

export default rootReducer;