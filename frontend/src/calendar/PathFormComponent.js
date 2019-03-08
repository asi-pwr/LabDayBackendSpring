import {Component} from "react";
import React from "react";
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from '@material-ui/icons/Close';
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";

class PathFormComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            pathChanges: {},
            open: false,
            name: '',
            info: ''
        }

        this.getPathData = () => {
            const { pathData } = this.props
            return pathData
        }
        this.getPathChanges = () => {
            const { pathChanges } = this.state
            return pathChanges
        }

    }

    changePath({ field, changes }) {
        const nextChanges = {
            ...this.getPathChanges(),
            [field]: changes,
        }
        this.setState({
            pathChanges: nextChanges
        })
    }

    commitPath(type) {
        const { commitChanges } = this.props
        const commitPath = {
            ...this.getPathData(),
            ...this.getPathChanges(),
            active: true
        }
        commitChanges({
            [type] : type === 'deleted' ? commitPath.id : commitPath
        })
        this.setState( { pathChanges: {} })
    }



    render() {
        const { pathChanges } = this.state
        const { classes, open, handleClose, pathData} = this.props
        const isNewPath = pathData.id === undefined
        const displayPathData = {
            ...pathData,
            ...pathChanges,
        }
        const textEditorProps = field => ({
            variant: 'outlined',
            onChange:({ target }) => this.changePath({ field:[field], changes: target.value}),
            value: displayPathData[field] || '',
            autoFocus: true,
            margin: 'dense',
            fullWidth: true
        })
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby='form-dialog-title'
                >
                    <div className={classes.header}>
                        <DialogTitle className={classes.title}>{isNewPath ? 'Dodaj nową' : 'Edytuj'} ścieżkę</DialogTitle>
                        <IconButton className={classes.closeButton} onClick={handleClose}>
                            <Close color="action"/>
                        </IconButton>
                    </div>
                    <DialogContent>
                        { !isNewPath && <PathInfo pathData={pathData}/>}
                        <TextField
                            label="Nazwa ścieżki"
                            {...textEditorProps('name')}
                        />
                        <TextField
                            label="Informacje na temat ścieżki"
                            {...textEditorProps('info')}
                        />
                    </DialogContent>
                    <DialogActions>
                        {!isNewPath && (
                            <Button variant="outlined" onClick={e => {
                                this.commitPath('deleted')
                                handleClose()
                            }}
                                    color="secondary">
                                Usuń
                            </Button>
                        )}

                        <Button variant="outlined" onClick={e=> {
                            this.commitPath('posted')
                            handleClose()
                        }} color="primary">
                            {isNewPath ? 'Dodaj' : 'Zapisz' }
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

    },
    closeButton: {
        float: 'right'
    },
    header: {
        display: 'inline-block',
        overflow: 'hidden',
        paddingTop: theme.spacing.unit / 2,
    },
    title: {
        display: 'inline-block'
    }
});

function PathInfo(props){
    const { pathData } = props
    return (
        <div>
        <DialogContentText>nazwa: {pathData.name}</DialogContentText>
        <DialogContentText>info: {pathData.info}</DialogContentText>
            <br/>
        </div>
)
}


export default connect()(withStyles(styles)(PathFormComponent))