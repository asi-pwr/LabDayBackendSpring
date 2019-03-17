import React from "react";
import {connect} from "react-redux";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ButtonBase from "@material-ui/core/es/ButtonBase/ButtonBase";
import Fab from "@material-ui/core/Fab/Fab";
import AddIcon from '@material-ui/icons/Add';
import {Link as RouterLink} from "react-router-dom";
import {restActions} from "../actions/restActions";
import {restConstants} from "../constants/restConstants";

class ShowSpeakersComponent extends React.Component {

    constructor(props){
        super(props);
        const { dispatch } = this.props;

        dispatch(restActions.restGet('/speakers', restConstants.GET_SPEAKER_REQUEST));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { speakerReducer, dispatch } = this.props;

        if (speakerReducer.deletedItemId !== prevProps.speakerReducer.deletedItemId) {
            dispatch(restActions.restGet('/speakers', restConstants.GET_SPEAKER_REQUEST));
        }
    }

    render() {
        const { speakerReducer, classes, dispatch } = this.props;
        return (
            <div className={classes.root}>
                <Fab  aria-label="Add" className={classes.addButton} component={RouterLink} to={'/addSpeaker'}>
                    <AddIcon/>
                </Fab>
                { speakerReducer.speakers
                    .filter((speaker) => (speaker.name !== "NaS"))
                    .map(speaker => (
                    <Grid key={speaker.id}>
                        <ShowSpeaker speaker = {speaker} classes={classes} dispatch={dispatch} />
                    </Grid>
                ))}
            </div>
        );
    }
}

function ShowSpeaker(props) {
    const { classes, speaker, dispatch} = props;

    return(
        <Card className={classes.card}>
            <ButtonBase>
                <img alt="" src={speaker.img}/>
            </ButtonBase>
            <CardContent>
                <Typography variant="h5" component="h2">
                    nazwa: {speaker.name}
                </Typography>
                <Typography component="p">
                    info: {speaker.info}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button className={classes.deleteButton} size="small"  onClick={()=>{
                    dispatch(restActions.restDelete(speaker.id, '/speakers', restConstants.DELETE_SPEAKER_REQUEST))
                }}>Usuń</Button>
                <Button disabled={true} className={classes.buttonId}>
                    id: {speaker.id}
                </Button>
            </CardActions>
        </Card>
    )

}

const styles = {
    addButton: {
        marginTop: 50
    },
    root: {
        display: 'inline-block'
    },
    card: {
        paddingBottom: 15,
        margin: 50,
    },
    cardAction: {
        display: 'block'
    },
    buttonId:{
        paddingRight: '10px',
        float: 'right'
    },
    deleteButton: {
        padding: '10px',
        float: 'left'
    }
};

ShowSpeakersComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { speakerReducer } = state;
    return { speakerReducer}
}

export default connect(mapStateToProps)(withStyles(styles)(ShowSpeakersComponent))