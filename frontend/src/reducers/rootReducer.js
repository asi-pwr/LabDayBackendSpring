import {authentication} from "./authenticationReducer";
import { placeReducer } from "./PlaceReducer";
import {combineReducers} from "redux";
import {pathReducer} from "./pathReducer";
import {appointmentReducer} from "./AppointmentReducer";
import {speakerReducer} from "./speakerReducer";
import {userReducer} from "./userReducer";
import {publicAccessActiveReducer} from "./PublicAccessReducer";

const rootReducer = combineReducers({
    authentication,
    placeReducer,
    pathReducer,
    appointmentReducer,
    speakerReducer,
    userReducer,
    publicAccessActiveReducer,
});

export default rootReducer;