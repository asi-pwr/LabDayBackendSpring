import React from "react";
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';


class AppointmentFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentChanges: {},
        };
    }
    render() {
        const { visible, visibleChange } = this.props;
        return (
            <AppointmentForm.Popup
                visible={visible}
                onBackdropClick={visibleChange}
            >
                <AppointmentForm.Container >
                    FormExample
                </AppointmentForm.Container>
            </AppointmentForm.Popup>
        );
    }
}

export default AppointmentFormComponent
