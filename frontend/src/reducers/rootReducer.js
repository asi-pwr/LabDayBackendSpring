import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";
import {speakerReducer} from "./speakerReducer";

const rootReducer = combineReducers({
    authentication,
    placeReducer,
    speakerReducer
});

export default rootReducer;