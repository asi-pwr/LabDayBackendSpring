import React from "react";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import PathSelectorComponent from "./PathSelectorComponent";


class ToolbarCalendarComponent extends React.Component {
    render() {
        const { path, pathChange, paths } = this.props
        return (
            <Toolbar.FlexibleSpace>
                <PathSelectorComponent path={path} pathChange={pathChange} paths={paths}/>
            </Toolbar.FlexibleSpace>
        )
    }
}

export default ToolbarCalendarComponent
