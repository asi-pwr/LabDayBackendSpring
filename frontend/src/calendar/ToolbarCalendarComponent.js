import React from "react";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import PathSelectorComponent from "./PathSelectorComponent";
import {withStyles} from "@material-ui/core";


class ToolbarCalendarComponent extends React.Component {
    render() {
        const { path, pathChange, paths, classes } = this.props
        return (
            <Toolbar.FlexibleSpace className={classes.flexibleSpace}>
                <PathSelectorComponent path={path} pathChange={pathChange} paths={paths}/>
            </Toolbar.FlexibleSpace>
        )
    }
}

const styles = theme => ({
    flexibleSpace: {
        margin: 'auto 40px auto auto',
    },
});
export default withStyles(styles)(ToolbarCalendarComponent)
