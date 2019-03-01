import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";
import {pathReducer} from "./pathReducer";
import {appointmentReducer} from "./AppointmentReducer";

const rootReducer = combineReducers({
    authentication,
    placeReducer,
    pathReducer,
    appointmentReducer
});

export default rootReducer;