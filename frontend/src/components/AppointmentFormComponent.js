import React from "react";
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from '@material-ui/icons/Close';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/es/TextField/TextField";
import { InlineDateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import Button from "@material-ui/core/es/Button/Button";


class AppointmentFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentChanges: {},
        };

        this.getAppointmentData = () => {
            const { appointmentData } = this.props
            return appointmentData
        }
        this.getAppointmentChanges = () => {
            const { appointmentChanges } = this.state
            return appointmentChanges
        }

    }

    changeAppointment({ field, changes }) {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
        console.log(this.state.appointmentChanges)
    }


    render() {
        const {  classes, visible, visibleChange, appointmentData } = this.props;
        const { appointmentChanges } = this.state
        const isNewAppointment = appointmentData.id === undefined;
        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };
        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target }) => this.changeAppointment({ field: [field], changes: target.value }),
            value: displayAppointmentData[field] || '',
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            keyboard: true,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({ field: [field], changes: date }),
            variant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/],
        });

        return (
            <AppointmentForm.Popup
                visible={visible}
                onBackdropClick={visibleChange}
            >
                <AppointmentForm.Container className={classes.container}>
                    <div className={classes.header}>
                        <IconButton className={classes.closeButton} onClick={visibleChange}>
                            <Close color="action"/>
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.wrapper}>
                            <TextField label="Nazwa"
                                {...textEditorProps('name')}
                            />
                        </div>
                        <div className={classes.wrapper}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <InlineDateTimePicker label="Rozpoczęcie" {...pickerEditorProps('startTime')} />
                                <InlineDateTimePicker label="Zakończenie" {...pickerEditorProps('endTime')}/>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.wrapper}>
                            <TextField label="Temat" {...textEditorProps('topic')}/>
                        </div>
                        <div className={classes.wrapper}>
                            <TextField label='Adres' {...textEditorProps('address')}/>
                        </div>
                        <div className={classes.wrapper}>
                            <TextField label="Pokój" {...textEditorProps('room')}/>
                        </div>
                        <div className={classes.wrapper}>
                            <TextField
                                label="Informacje"
                                {...textEditorProps('info')}
                                multiline
                                rows="3"
                            />
                        </div>
                        {/*TODO!! path, 3x img, longitude and latitude */}
                    </div>
                    <div className={classes.buttonGroup}>
                        {!isNewAppointment && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={visibleChange}
                            >
                                Usuń
                                {/*TODO!! commit changes!*/}
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={visibleChange}
                        >
                            {isNewAppointment ? 'Dodaj' : 'Zapisz' }

                        </Button>
                    </div>
                </AppointmentForm.Container>
            </AppointmentForm.Popup>
        );
    }
}
const containerStyles = theme => ({
    container: {
        width: `${theme.spacing.unit * 68}px`,
        padding: 0,
        paddingBottom: theme.spacing.unit * 2,
    },
    content: {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing.unit / 2,
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
    },
    picker: {
        marginRight: theme.spacing.unit * 2,
        '&:last-child': {
            marginRight: 0,
        },
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.unit}px 0px`,
    },
    icon: {
        margin: `${theme.spacing.unit * 2}px 0`,
        marginRight: `${theme.spacing.unit * 2}px`,
    },
    textField: {
        width: '100%',
    },
});


export default withStyles(containerStyles)(AppointmentFormComponent)
