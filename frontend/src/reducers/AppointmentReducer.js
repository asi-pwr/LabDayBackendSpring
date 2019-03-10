import {restConstants} from "../constants/restConstants";
import * as moment from "moment";

const initialState = {
    appointments: [],
    newAppointment: {},
    timetables: [],
    deletedItem: {}
}


export function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case restConstants.GET_TIMETABLE_REQUEST:
            return{
                appointments: state.appointments,
                timetables: action.data
            }
        case restConstants.GET_EVENT_REQUEST:
            let newAppointments = []
            state.timetables.forEach(function (appointment, index) {
                const event_id = appointment.event_id
                const appointmentId = appointment.id
                newAppointments[index] = {
                    ...appointment,
                    ...(action.data.filter(event => (
                        event.id === event_id
                    )))[0]
                }
                newAppointments[index].id =  appointmentId
                newAppointments[index].title = newAppointments[index].name
                newAppointments[index].startDate = moment.unix(newAppointments[index].time_start).format('YYYY-MM-DD HH:mm')
                newAppointments[index].endDate = moment.unix(newAppointments[index].time_end).format('YYYY-MM-DD HH:mm')

            })
            return{
                timetables: state.timetables,
               appointments: newAppointments
            }
        case restConstants.POST_EVENT_REQUEST:
            return{
                ...state,
            }
        case restConstants.POST_TIMETABLE_REQUEST:
            return{
                ...state,
               newAppointment: action.data

            }
        case restConstants.DELETE_TIMETABLE_REQUEST:
            return{
                ...state,
                deletedItem: action.deletedItem

            }
        case restConstants.DELETE_EVENT_REQUEST:
            return{
                ...state,
                deletedItem: action.deletedItem
            }
        default:
            return state
    }
}