import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";


export const AppointmentActions = {
    getAppointments,
    postAppointment
}

function getAppointments() {
    return dispatch => {
        axiosInstance.get('/events')
            .then(response => {
                dispatch({
                    status: response.status,
                    type: restConstants.GET_EVENT_REQUEST,
                    data: response.data
                })
            })
        axiosInstance.get('/timetables')
            .then(response => {
                dispatch({
                    status: response.status,
                    type: restConstants.GET_TIMETABLE_REQUEST,
                    data: response.data
                })
            })
    }
}

function postAppointment(appointment) {

}