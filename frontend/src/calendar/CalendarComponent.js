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

const theme = createMuiTheme(
    {
        typography: { useNextVariants: true },
        palette: { type: "light", primary: blue }
    });



class CalendarComponent extends React.Component {
    constructor(props){
        super(props);
        const { dispatch } = props
        dispatch(PathActions.getPaths())
        this.state = {
            addedAppointment: {},
            editingAppointmentId: undefined,
            deletedAppointmentId: undefined,
            confirmationVisible: false,
            currentPath: 0,
            data:[
                {
                    startDate: '2019-02-24 15:30',
                    endDate: '2019-02-24 16:00',
                    title: 'Rejestracja',
                    id: 1,
                    path_id: 1
                },
                {
                    startDate: '2019-02-24 15:30',
                    endDate: '2019-02-24 16:00',
                    title: 'AAAA',
                    id: 2,
                    path_id: 1
                },
                {
                    startDate: '2019-02-24 15:30',
                    endDate: '2019-02-24 16:00',
                    title: 'BBBBBB',
                    id: 3,
                    path_id: 0
                }
            ]
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
        this.toolbar = connectProps(ToolbarCalendarComponent, ()=> {
            const {paths } = this.props
            const { currentPath } = this.state
            return {
                path: currentPath,
                pathChange: this.pathChange,
                paths: paths
            }

        } )

    }

    commitDeletedAppointment(){
        const { data, deletedAppointmentId } = this.state
        const nextData = data.filter(appointment => appointment.id !== deletedAppointmentId)
        this.setState({data: nextData, deletedAppointmentId: null})
        this.toggleConfirmationVisible()
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
        this.setState({ data, addedAppointment: {} });
        if (deleted !== undefined) {
            this.setDeletedAppointmentId(deleted);
            this.toggleConfirmationVisible()
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.appointmentForm.update()
        this.toolbar.update()

        const { dispatch } = this.props
        dispatch(PathActions.getPaths())


    }

    toggleEditingFormVisibility(){
        const { editingFormVisible } = this.state
        this.setState({ editingFormVisible: !editingFormVisible })
    }



    render() {
        const { data, currentDate, editingFormVisible, confirmationVisible, currentPath } = this.state
        return(
            <div>
                CalendarComponent
                <br/>
                <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler data={filterData(data, currentPath)}>
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
    const { paths } = state.pathReducer
    return { paths}
}

const filterData = (data, pathId) => data.filter(event => ( event.path_id === pathId));

export default connect(mapStateToProps)(CalendarComponent)