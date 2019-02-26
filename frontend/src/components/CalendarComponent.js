import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {
    Appointments,
    DateNavigator,
    DayView, MonthView,
    Scheduler,
    ViewSwitcher,
    WeekView,
    AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blue} from "@material-ui/core/colors";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import {EditingState, ViewState} from "@devexpress/dx-react-scheduler";
import { AppointmentTooltip } from '@devexpress/dx-react-scheduler-material-ui';
import {connectProps} from "@devexpress/dx-react-core";
import AppointmentFormContainer from "./AppointmentFormComponent";

const theme = createMuiTheme(
    {
        typography: { useNextVariants: true },
        palette: { type: "light", primary: blue }
    });



class CalendarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addedAppointment: {},
            editingAppointmentId: undefined,
            deletedAppointmentId: undefined,
            data:[
                {
                    startDate: '2019-02-24 15:30',
                    endDate: '2019-02-24 16:00',
                    title: 'Rejestracja',
                    id: 1
                }
            ]
        }

        this.currentDateChange = (currentDate) => { this.setState({ currentDate })}
        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this)
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this)
        this.commitChanges = this.commitChanges.bind(this)
        this.onEditingAppointmentIdChange = this.onEditingAppointmentIdChange.bind(this)
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this)
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this)

        this.appointmentForm = connectProps(AppointmentFormContainer, () => {
            const {editingFormVisible} = this.state
            const { data, editingAppointmentId, addedAppointment } = this.state
            const clickedAppointment = data
                .filter(appointment => appointment.id === editingAppointmentId)[0] || addedAppointment
            return {
                appointmentData: clickedAppointment,
                visible: editingFormVisible,
                visibleChange: this.toggleEditingFormVisibility,
                commitChanges: this.commitChanges,
                onEditingAppointmentIdChange: this.onEditingAppointmentIdChange
            }
        })

    }

    commitDeletedAppointment(deletedId){
        const { data } = this.state

        console.log('commitDeletedAppointment')
        console.log(deletedId)
        const nextData = data.filter(appointment => appointment.id !== deletedId)
        console.log(nextData)
        this.setState({data: nextData, deletedAppointmentId: null})
    }

    onEditingAppointmentIdChange(editingAppointmentId){
        this.setState({editingAppointmentId})
    }

    onAddedAppointmentChange(addedAppointment){
        this.setState({ addedAppointment})
        this.onEditingAppointmentIdChange(undefined)
    }

    setDeletedAppointmentId(id) {
        this.setState({ deletedAppointmentId: id });
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitChanges({ added, changed, deleted }) {
        let { data } = this.state;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [
                ...data,
                {
                    id: startingAddedId,
                    ...added,
                },
            ];
        }
        if (changed) {
            data = data.map(appointment => (
                changed.id === appointment.id ? { ...appointment, ...changed } : appointment));
        }
        //  this.toggleConfirmationVisible();
        this.setState({ data, addedAppointment: {} });
        if (deleted !== undefined) {
            this.setDeletedAppointmentId(deleted);
            this.commitDeletedAppointment(deleted)
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.appointmentForm.update()
    }

    toggleEditingFormVisibility(){
        const { editingFormVisible } = this.state
        this.setState({ editingFormVisible: !editingFormVisible })
    }

    render() {
        const { data, currentDate, editingFormVisible } = this.state
        return(
            <div>
                CalendarComponent
                <br/>
                <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler data={data}>
                        <ViewState
                            currentDate={currentDate}
                            onCurrentDateChange={this.currentDateChange}
                        />
                        <EditingState
                            onCommitChanges={this.commitChanges}
                            onEditingAppointmentIdChange={this.onEditingAppointmentIdChange}
                            onAddedAppointmentChange={this.onAddedAppointmentChange}/>
                        <DayView/>
                        <MonthView/>
                        <WeekView/>
                        <Toolbar/>
                        <DateNavigator/>
                        <ViewSwitcher/>
                        <Appointments />
                        <AppointmentTooltip
                            showOpenButton
                            showCloseButton
                            showDeleteButton
                        />
                        <AppointmentForm
                        popupComponent={this.appointmentForm}
                        visible={editingFormVisible}
                        onVisibilityChange={ this.toggleEditingFormVisibility}/>
                    </Scheduler>
                </Paper>
                </MuiThemeProvider>

            </div>
        )
    }

}

export default CalendarComponent