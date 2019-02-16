import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from  'material-ui/TextField';
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';
import Input from "@material-ui/core/Input/Input";
import RaisedButton from 'material-ui/RaisedButton';

class AddPlaceComponent extends React.Component {
    state = {
        type: '',
        name: '',
        info: '',
        img: '',
        latitude: '',
        longitude: ''
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    handleSubmit = e => {
        const place = {
            type: this.state.type,
            name: this.state.name,
            info: this.state.info,
            img: this.state.img,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        if (place.type === ''){
            place.type = 0
        }
        console.log(place)
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <br/>
                <h3>Dodawanie nowego miejsca</h3>

                <MuiThemeProvider>
                    <React.Fragment>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="place-type">Typ miejsca</InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={this.handleChange('type')}
                                input={<Input name="type" id="place-type"/>}
                            >
                                <MenuItem value = {0}><em>Źaden z poniższych</em></MenuItem>
                                <MenuItem value = {1}>Punkt informacyjny</MenuItem>
                                <MenuItem value = {2}>Jedzenie</MenuItem>
                                <MenuItem value = {3}>Odpoczynek</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <TextField
                            hintText="Wpisz nazwe miejsca"
                            floatingLabelText="nazwa"
                            onChange={this.handleChange('name')}
                        />
                        <br/>
                        <TextField
                            hintText="Wpisz informacje na temat miejsca"
                            floatingLabelText="informacje"
                            onChange={ this.handleChange('info') }
                        />
                        <br/>
                        <TextField
                            hintText="wstaw link do obrazka"
                            floatingLabelText="obraz"
                            onChange={this.handleChange('img')}
                        />
                        <br/>
                        <TextField
                            hintText="Wpisz latitude"
                            floatingLabelText="latitude"
                            onChange={this.handleChange('latitude')}
                        />
                        <br/>
                        <TextField
                            hintText="Wpisz longitude"
                            floatingLabelText="longitude"
                            onChange={this.handleChange('longitude')}
                        />
                        <br/>
                        <br/>
                        <RaisedButton
                            label="dodaj"
                            primary = {true}
                            onClick = {this.handleSubmit}
                        />
                    </React.Fragment>
                </MuiThemeProvider>
            </div>
        )
    }

}
const styles = {
    formControl: {
        minWidth: 256,
    },

};

AddPlaceComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPlaceComponent);