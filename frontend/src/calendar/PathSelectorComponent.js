import {Component} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/es/Select/Select";
import React from "react";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";

class PathSelectorComponent extends Component {
    render() {
        const { path, pathChange, paths, classes } = this.props
        return(
            <FormControl className={classes.pathSelector}>
                <Select
                    disableUnderline
                    value={path}
                    onChange={(e) => {pathChange(e.target.value)}}
                >
                    {paths.map((singlePath) => (
                        <MenuItem value={singlePath.id} key={singlePath.id.toString()} className={classes.pathSelectorItem}>
                            {singlePath.name}
                        </MenuItem>
                    ))}
                    </Select>
            </FormControl>
            )
    }
}


const styles = theme => ({
    pathSelector: {
        marginLeft: theme.spacing.unit * 2,
        minWidth: 140,
    },
    pathSelectorItem: {
        display: 'flex',
        alignItems: 'center',
    }
});
export default withStyles(styles)(PathSelectorComponent)