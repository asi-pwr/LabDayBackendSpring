import moment from "moment";

export const AppointmentService ={
    addAppointment,
    changeAppointment,
}

function addAppointment(appointment){
        const event = {
            name: appointment.title,
            img: appointment.img,
            address: appointment.address,
            room: appointment.room,
            info: appointment.info,
            topic: appointment.topic,
            speaker_id: appointment.speaker_id,
            dor1_img: appointment.dor1_img,
            dor2_img: appointment.dor2_img,
            latitude: appointment.latitude,
            longitude: appointment.longitude
        }
        const timetable = {
            path_id: appointment.path_id,
            time_start: moment(appointment.startDate,'YYYY-MM-DD HH:mm').unix(),
            time_end: moment(appointment.endDate,'YYYY-MM-DD HH:mm').unix(),
        }
        return { event, timetable }

}

function changeAppointment(appointment) {
    const event = {
        id: appointment.event_id,
        name: appointment.title,
        img: appointment.img,
        address: appointment.address,
        room: appointment.room,
        info: appointment.info,
        topic: appointment.topic,
        speaker_id: appointment.speaker_id,
        dor1_img: appointment.dor1_img,
        dor2_img: appointment.dor2_img,
        latitude: appointment.latitude,
        longitude: appointment.longitude
    }
    const timetable = {
        id: appointment.id,
        event_id: appointment.event_id,
        path_id: appointment.path_id,
        time_start: moment(appointment.startDate,'YYYY-MM-DD hh:mm').unix(),
        time_end: moment(appointment.endDate,'YYYY-MM-DD hh:mm').unix(),
    }
    return { event, timetable }
}