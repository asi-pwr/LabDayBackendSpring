import React from "react";
import Paper from "@material-ui/core/es/Paper/Paper";
import {DayView, Scheduler} from '@devexpress/dx-react-scheduler-material-ui';

class CalendarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }

    }

    render() {
        const { data } = this.state
        return(
            <div>
                CalendarComponent
                <br/>
                <Paper>
                    <Scheduler data={data}>
                        <DayView/>
                    </Scheduler>
                </Paper>

            </div>
        )
    }

}

export default CalendarComponent