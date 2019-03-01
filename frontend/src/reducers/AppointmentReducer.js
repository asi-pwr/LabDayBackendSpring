import {restConstants} from "../constants/restConstants";
import * as moment from "moment";

const initialState = {
    appointments: [],
    newAppointment: {}
}


export function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case restConstants.GET_TIMETABLE_REQUEST:
            return{
                ...state,
                appointments: action.data
            }
        case restConstants.GET_EVENT_REQUEST:
            let appointments = []
            state.appointments.forEach(function (appointment, index) {
                appointments[index] = {
                    ...appointment,
                    ...(action.data.filter(event => (
                        event.id === appointment.event_id
                    )))[0]
                }
                appointments[index].title = appointments[index].name
                appointments[index].startDate = moment.unix( appointments[index].time_start).format('YYYY-MM-DD hh:mm')
                appointments[index].endDate = moment.unix(1000+ appointments[index].time_end).format('YYYY-MM-DD hh:mm')

            })
            return{
               appointments: appointments
            }
        default:
            return state
    }
}