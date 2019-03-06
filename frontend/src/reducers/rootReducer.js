import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";
import {pathReducer} from "./pathReducer";
import {appointmentReducer} from "./AppointmentReducer";
import {speakerReducer} from "./speakerReducer";

const rootReducer = combineReducers({
    authentication,
    placeReducer,
    pathReducer,
    appointmentReducer
    speakerReducer
});

export default rootReducer;