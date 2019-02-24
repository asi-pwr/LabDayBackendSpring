import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {
    Appointments,
    DateNavigator,
    DayView, MonthView,
    Scheduler,
    ViewSwitcher,
    WeekView
} from '@devexpress/dx-react-scheduler-material-ui';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {blue} from "@material-ui/core/colors";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState} from "@devexpress/dx-react-scheduler";

const theme = createMuiTheme(
    {
        typography: { useNextVariants: true },
        palette: { type: "light", primary: blue }
    });



class CalendarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[
                {
                    startDate: '2019-02-24 15:30',
                    endDate: '2019-02-24 16:00',
                    title: 'Rejestracja'
                }
            ]
        }

        this.currentDateChange = (currentDate) => { this.setState({ currentDate })}

    }



    render() {
        const { data, currentDate } = this.state
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
                        <DayView/>
                        <MonthView/>
                        <WeekView/>
                        <Toolbar/>
                        <DateNavigator/>
                        <ViewSwitcher/>
                        <Appointments />
                    </Scheduler>
                </Paper>
                </MuiThemeProvider>

            </div>
        )
    }

}

export default CalendarComponent