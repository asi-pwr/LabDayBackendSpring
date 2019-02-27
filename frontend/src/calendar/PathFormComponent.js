import {Component} from "react";
import React from "react";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {withStyles} from "@material-ui/core";

class PathFormComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            open: false,
            name: '',
            info: ''
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClose() {
        this.setState({open: false})
    }

    handleOpen() {
        this.setState({open: true})
    }

    handleChange(value, input) {
        this.setState({
            [input]: value
        })
    }

    render() {
        const {open} = this.state
        const {classes} = this.props
        return (
            <div>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpen}>
                    nowa ścieżka
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle>Dodaj nową ścieżkę</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            label="Nazwa ścieżki"
                            fullWidth
                            onChange={event => {
                                this.handleChange(event.target.value, 'name')
                            }}
                        />
                        <TextField
                            variant="outlined"
                            autoFocus
                            margin="dense"
                            label="Informacje na temat ścieżki"
                            fullWidth
                            onChange={event => {
                                this.handleChange(event.target.value, 'info')
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleClose} color="secondary">
                            Anuluj
                        </Button>
                        <Button variant="outlined" color="primary">
                            Dodaj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const styles = theme => ({
    button: {
        marginLeft: theme.spacing.unit * 3,

    }
});

export default withStyles(styles)(PathFormComponent)