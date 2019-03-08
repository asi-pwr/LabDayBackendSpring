import React from "react";
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import PathSelectorComponent from "./PathSelectorComponent";
import {withStyles} from "@material-ui/core";
import PathFormComponent from "./PathFormComponent";
import Button from "@material-ui/core/es/Button/Button";
import {PathActions} from "../actions/PathActions";
import {connect} from "react-redux";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Paper from "@material-ui/core/es/Paper/Paper";

class ToolbarCalendarComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            name: '',
            info: '',
            pathData: {},
            confirmationVisible: false,
            deletedPathId: undefined
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.commitChanges = this.commitChanges.bind(this)
        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this)
        this.commitDeletedPath = this.commitDeletedPath.bind(this)
    }

    render() {
        const { path, pathChange, paths, classes } = this.props
        const { open, pathData, confirmationVisible } = this.state
        return (
            <div className={classes.flexibleSpace}>
            <Toolbar.FlexibleSpace className={classes.flexibleSpace}>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleEdit}
                    disabled={path === -1}>
                    Edytuj ścieżkę
                </Button>
                <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpen}>
                    nowa ścieżka
                </Button>
                <PathFormComponent
                    handleClose={this.handleClose}
                    pathData={pathData}
                    commitChanges={this.commitChanges}
                open={open}/>
                <PathSelectorComponent
                    path={path}
                    pathChange={pathChange}
                    paths={paths}
                    allEvents={true}
                />

            </Toolbar.FlexibleSpace>
                <Dialog open={confirmationVisible}>
                    <DialogTitle>
                        Usuwanie Ścieżki
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Czy na pewno chcesz usunąć ścieżkę wraz z jej wszystkimi wydarzeniami?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
                            Anuluj
                        </Button>
                        <Button onClick={this.commitDeletedPath} color="secondary" variant="outlined">
                            Usuń
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    commitDeletedPath(){
        const { deletedPathId } = this.state
        const { dispatch, onDeletePath } = this.props
        onDeletePath(deletedPathId)
        dispatch(PathActions.deletePath(deletedPathId))
        this.toggleConfirmationVisible()
    }

    commitChanges({ posted, deleted }){
        const { dispatch } = this.props
        if (posted){
            dispatch(PathActions.postPath(posted))
        }
        if (deleted){
            this.setState({ deletedPathId: deleted})
            this.toggleConfirmationVisible()
        }
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    handleEdit(){
        const { path, paths } = this.props
        const pathData = paths.filter(singlePath => {
            return singlePath.id === path
        })[0]
        this.setState({
            pathData: pathData,
            open: true,
        })
    }

    handleSubmit(){
        const { name, info } = this.state
        const { dispatch } = this.props
        const path = {
            name,
            info,
            active: true
        }
        dispatch(PathActions.postPath(path))
        this.setState({ open: false})
    }
    handleClose() {
        this.setState({open: false})
    }

    handleOpen() {
        this.setState({
            pathData: {},
            open: true
        })
    }

    handleChange(value, input) {
        this.setState({
            [input]: value
        })
    }
}

const styles = theme => ({
    flexibleSpace: {
        margin: 'auto 40px auto auto',
        flex: 'inherit',
        display: 'inherit'
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
        marginTop: 'auto'
    },
});
export default connect()(withStyles(styles)(ToolbarCalendarComponent))
