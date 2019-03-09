import {Component} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";

class PathSelectorComponent extends Component {
    render() {
        const { pathId, pathChange, paths, classes, allEvents } = this.props
        return(
           <FormControl
               className={classes.pathSelector}
           >
               <InputLabel htmlFor="path-input">Ścieżka</InputLabel>
               <Select
                    disableUnderline
                    value={pathId}
                    onChange={(e) => {pathChange(e.target.value)}}
                    input={
                        <Input
                            name="Ścieżki"
                            id="path-input"
                        />
                    }
                >
                   {allEvents &&
                   <MenuItem value={-1}>
                       Wszystkie wydarzenia
                   </MenuItem>
                   }

                    {paths.map((singlePath) => (
                        <MenuItem
                            value={singlePath.id}
                            key={singlePath.id.toString()}
                            className={classes.pathSelectorItem}
                        >
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
        textAlign: 'left',
        marginLeft: theme.spacing.unit * 2,
        minWidth: 140,
    },
    pathSelectorItem: {
        display: 'flex',
        alignItems: 'center',
    }
});
export default withStyles(styles)(PathSelectorComponent)