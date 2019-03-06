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
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import ToolbarCalendarComponent from "./ToolbarCalendarComponent";
import {connect} from "react-redux";
import {PathActions} from "../actions/PathActions";
import {AppointmentActions} from "../actions/AppointmentActions";
import moment from "moment";
import {AppointmentService} from "../services/AppointmentService";

const theme = createMuiTheme(
    {
        typography: { useNextVariants: true },
        palette: { type: "light", primary: blue }
    });



class CalendarComponent extends React.Component {
    constructor(props){
        super(props);
        const { dispatch } = props
        dispatch(AppointmentActions.getAppointments())
        dispatch(PathActions.getPaths())

        this.state = {
            currentDate: moment().format('YYYY-MM-DD'),
            addedAppointment: {},
            editingAppointmentId: undefined,
            deletedAppointmentId: undefined,
            confirmationVisible: false,
            currentPath: -1,
        }

        this.pathChange = (value) => {
            this.setState({ currentPath: value})
        }
        this.currentDateChange = (currentDate) => { this.setState({ currentDate })}
        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this)
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this)
        this.commitChanges = this.commitChanges.bind(this)
        this.onEditingAppointmentIdChange = this.onEditingAppointmentIdChange.bind(this)
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this)
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this)
        this.onDeletePath = this.onDeletePath.bind(this)

        this.appointmentForm = connectProps(AppointmentFormContainer, () => {
            const { appointments} = this.props
            const {editingFormVisible, currentPath} = this.state
            const { editingAppointmentId, addedAppointment } = this.state
            const clickedAppointment = appointments
                .filter(appointment => appointment.id === editingAppointmentId)[0] || addedAppointment
            if (!clickedAppointment.path_id){
                clickedAppointment.path_id = currentPath === -1 ? '': currentPath
            }
            return {
                appointmentData: clickedAppointment,
                visible: editingFormVisible,
                visibleChange: this.toggleEditingFormVisibility,
                commitChanges: this.commitChanges,
                onEditingAppointmentIdChange: this.onEditingAppointmentIdChange
            }
        })
        this.toolbar = connectProps(ToolbarCalendarComponent, ()=> {
            const {paths } = this.props
            const { currentPath } = this.state
            return {
                path: currentPath,
                pathChange: this.pathChange,
                paths: paths,
                onDeletePath: this.onDeletePath,
            }

        } )

    }

    onDeletePath(pathId){
        const { dispatch, appointments } = this.props
        appointments.map(function(appointment){
            if (appointment.path_id === pathId){
                dispatch(AppointmentActions.deleteAppointment(appointment.event_id, appointment.id))
            }
        })
    }

    commitDeletedAppointment(){
        const { deletedAppointmentId } = this.state
        const { dispatch, appointments } = this.props
        const deleted = appointments.filter(appointment => ( appointment.id === deletedAppointmentId))[0];
        dispatch(AppointmentActions.deleteAppointment(deleted.event_id, deleted.id))
        this.toggleConfirmationVisible()
    }

    onEditingAppointmentIdChange(editingAppointmentId){
        this.setState({editingAppointmentId})
    }

    onAddedAppointmentChange(addedAppointment){
        addedAppointment.startDate = moment.unix(addedAppointment.startDate.getTime()/1000).format('YYYY-MM-DD HH:mm')
        addedAppointment.endDate = moment.unix(addedAppointment.endDate.getTime()/1000).format('YYYY-MM-DD HH:mm')
        this.setState({ addedAppointment})
        this.onEditingAppointmentIdChange(undefined)
    }

    setDeletedAppointmentId(id) {
        this.setState({ deletedAppointmentId: id});
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitChanges({ added, changed, deleted }) {
        const { dispatch } = this.props
        if (added) {
            const appointment = AppointmentService.addAppointment(added)
            dispatch(AppointmentActions.postAppointment(appointment.event, appointment.timetable))
        }
        if (changed) {
            const appointment = AppointmentService.changeAppointment(changed)
            dispatch(AppointmentActions.postAppointment(appointment.event, appointment.timetable))
        }
        if (deleted){
                this.setDeletedAppointmentId(deleted);
                this.toggleConfirmationVisible()

        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { newPath, newAppointment, deletedItem, dispatch, appointments, deletedPathId } = this.props
        const { currentPath } = this.state
        if (newAppointment !== prevProps.newAppointment ||
                deletedItem !== prevProps.deletedItem){

            dispatch(AppointmentActions.getAppointments())
        }
        if (appointments !== undefined){
            this.appointmentForm.update()
        }
        this.toolbar.update()
        if (newPath !== prevProps.newPath){
            dispatch(PathActions.getPaths())
        }
        if (deletedPathId !== prevProps.deletedPathId){
            if (currentPath === deletedPathId) {
                this.setState({
                    currentPath: -1
                })
            }
            dispatch(PathActions.getPaths())
        }

    }

    toggleEditingFormVisibility(){
        const { editingFormVisible } = this.state
        this.setState({ editingFormVisible: !editingFormVisible })
    }



    render() {
        const { currentDate, editingFormVisible, confirmationVisible, currentPath } = this.state
        const { appointments} = this.props
        return(
            <div>
                CalendarComponent
                <br/>
                <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler data={currentPath === -1 ? appointments : filterData(appointments, currentPath)}>
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
                        <Toolbar flexibleSpaceComponent={this.toolbar}/>
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

                    <Dialog
                        open={confirmationVisible}
                    >
                        <DialogTitle>
                            Usuwanie wydarzenia
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Czy na pewno chcesz usunąć to wydarzenie?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                                Anuluj
                            </Button>
                            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
                                Usuń
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
                </MuiThemeProvider>

            </div>
        )
    }

}

function mapStateToProps(state) {
    const { appointments, newAppointment, deletedItem } = state.appointmentReducer
    const { paths, newPath, deletedPathId } = state.pathReducer
    return { paths, newPath, appointments, newAppointment, deletedItem, deletedPathId }
}

const filterData = (data, pathId) => data.filter(event => ( event.path_id === pathId));

export default connect(mapStateToProps)(CalendarComponent)