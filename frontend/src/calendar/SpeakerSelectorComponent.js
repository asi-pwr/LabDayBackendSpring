import {Component} from "react";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import Input from "@material-ui/core/Input/Input";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import React from "react";

class SpeakerSelectorComponent extends Component {
    render() {
        const { speakerId, speakerChange, speakers, classes} = this.props;
        const notASpeaker = speakers.filter((speaker) => (speaker.name === "NaS"))[0];
        return(
            <FormControl
                className={classes.speakerSelector}
            >
                <InputLabel htmlFor="path-input">Prelegent</InputLabel>
                <Select
                    disableUnderline
                    value={speakerId}
                    onChange={(e) => {speakerChange(e.target.value)}}
                    input={<Input name="Prelegenci" id="path-input"/>}
                >

                    <MenuItem
                        value={notASpeaker.id}
                        key={notASpeaker.id.toString()}
                        className={classes.pathSelectorItem}
                    >
                        Brak
                    </MenuItem>
                    {speakers
                        .filter((speaker) => (speaker.name !== "NaS"))
                        .map((speaker) => (
                        <MenuItem
                            value={speaker.id}
                            key={speaker.id.toString()}
                            className={classes.pathSelectorItem}
                        >
                            {speaker.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

}


const styles = theme => ({
    speakerSelector: {
        textAlign: 'left',
        marginLeft: theme.spacing.unit * 2,
        minWidth: 140,
    },
    speakerSelectorItem: {
        display: 'flex',
        alignItems: 'center',
    }
});
export default withStyles(styles)(SpeakerSelectorComponent)