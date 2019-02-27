import React from "react";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import PathSelectorComponent from "./PathSelectorComponent";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";


class ToolbarCalendarComponent extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }

    handleClose(){
        this.setState({open: false})
    }
    handleOpen(){
        this.setState({ open: true})
    }

    render() {
        const {open } = this.state
        const { path, pathChange, paths, classes } = this.props
        return (
            <Toolbar.FlexibleSpace className={classes.flexibleSpace}>
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
                        type="namePath"
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        label="Informacje na temat ścieżki"
                        type="infoPath"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={this.handleClose} color="secondary">
                    Anuluj
                    </Button>
                    <Button variant="outlined" onClick={this.handleClose} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
                </Dialog>

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
