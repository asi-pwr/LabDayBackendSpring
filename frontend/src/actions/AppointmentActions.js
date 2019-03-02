import axiosInstance from "../helpers/axiosInstance";
import {restConstants} from "../constants/restConstants";

export const AppointmentActions = {
    getAppointments,
    postAppointment,
    deleteAppointment,
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

function postAppointment(event, timetable) {
    return dispatch => {
        axiosInstance.post('/events', JSON.stringify(event))
            .then(response => {
                dispatch({
                    status: response.status,
                    type: restConstants.POST_EVENT_REQUEST,
                    data: response.data
                })

                if (!timetable.event_id){
                    timetable.event_id = response.data.id
                }
                axiosInstance.post('/timetables', JSON.stringify(timetable))
                    .then(response => {
                        dispatch({
                            status: response.status,
                            type: restConstants.POST_TIMETABLE_REQUEST,
                            data: response.data
                        })
                    })
            })


    }
}

function deleteAppointment(eventId, timetableId) {
    return dispatch => {
        axiosInstance.delete('/events/' + eventId)
            .then(response => {
                dispatch({
                    status: response.status,
                    deletedItem: eventId,
                    type: restConstants.DELETE_EVENT_REQUEST,
                })
            })
        axiosInstance.delete('/timetables/' + timetableId)
            .then(response => {
                dispatch({
                    status: response.status,
                    deletedItem: timetableId,
                    type: restConstants.DELETE_TIMETABLE_REQUEST,
                })
            })
    }
}