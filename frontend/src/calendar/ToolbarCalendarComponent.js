import React from "react";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import PathSelectorComponent from "./PathSelectorComponent";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";


class ToolbarCalendarComponent extends React.Component {
    render() {
        const { path, pathChange, paths, classes } = this.props
        return (
            <Toolbar.FlexibleSpace className={classes.flexibleSpace}>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary">
                    nowa ścieżka
                </Button>

                <PathSelectorComponent path={path} pathChange={pathChange} paths={paths}/>

            </Toolbar.FlexibleSpace>
        )
    }
}

const styles = theme => ({
    flexibleSpace: {
        margin: 'auto 40px auto auto',
        flex: 'inherit'
    },
    button: {
        marginLeft: theme.spacing.unit * 3,

    }
});
export default withStyles(styles)(ToolbarCalendarComponent)
