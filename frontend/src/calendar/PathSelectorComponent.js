import {Component} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/es/Select/Select";
import React from "react";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

class PathSelectorComponent extends Component {
    render() {
        const { path, pathChange, paths } = this.props
        return(
            <FormControl>
                <Select
                    disableUnderline
                    value={path}
                    onChange={(e) => {pathChange(e.target.value)}}
                >
                    {paths.map((singlePath) => (
                        <MenuItem value={singlePath.id} key={singlePath.id.toString()}>
                            {singlePath.name}
                        </MenuItem>
                    ))}
                    </Select>
            </FormControl>
            )
    }
}

export default PathSelectorComponent