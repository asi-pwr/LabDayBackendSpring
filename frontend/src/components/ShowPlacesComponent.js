import React from "react";
import {placeActions} from "../actions/PlaceActions";
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

class ShowPlacesComponent extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(placeActions.getPlaces())
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { placeReducer, dispatch } = this.props
        if (placeReducer.deletedItemId !== prevProps.placeReducer.deletedItemId) {
            dispatch(placeActions.getPlaces())
        }

    }

    render() {
        const { placeReducer, classes, dispatch } = this.props
        return (
            <div className={classes.root}>
                <Fab  aria-label="Add" className={classes.addButton} component={RouterLink} to={'/addPlace'}>
                    <AddIcon/>
                </Fab>
                { placeReducer.places.map(place => (
                    <Grid key={place.id}>
                        <ShowPlace place = {place} classes={classes} dispatch={dispatch} />
                    </Grid>
                ))}
            </div>
        );
    }
}

function getType(type) {
    switch (type) {
        case 0: return ''
        case 1: return 'Informacja'
        case 2: return 'Jedzenie'
        case 3: return 'Odpoczynek'
        default: return ''
    }
}

function ShowPlace(props) {
    const { classes, place, dispatch} = props
    const type = getType(place.type)

    return(

        <Card className={classes.card}>
            {/*<Typography color="textSecondary" gutterBottom>*/}
                {/*id: {place.id}*/}
            {/*</Typography>*/}
            <ButtonBase>
                <img alt="" src={place.img}/>
            </ButtonBase>
            <CardContent>
                <Typography variant="h5" component="h2">
                    nazwa: {place.name}
                </Typography>
                <Typography variant="h6" component="h4">
                    typ: {type}
                </Typography>
                <Typography component="p">
                    info: {place.info}
                </Typography>
                <Typography component="p">
                    lat: {place.latitude}
                    <br/>
                    longi: {place.longitude}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardAction}>
                <Button className={classes.deleteButton} size="small"  onClick={()=>{
                    dispatch(placeActions.deletePlace(place.id))
                }}>Usuń</Button>
                <Button disabled={true} className={classes.buttonId}>
                id: {place.id}
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
ShowPlacesComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const { placeReducer } = state
    return { placeReducer}
}

export default connect(mapStateToProps)(withStyles(styles)(ShowPlacesComponent))