import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {restActions} from "../actions/restActions";
import {restConstants} from "../constants/restConstants";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import PathSelectorComponent from "../calendar/PathSelectorComponent";
import {PathActions} from "../actions/PathActions";
import {withStyles} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import Switch from "@material-ui/core/es/Switch/Switch";
import {backendURL} from "../App";

class UserPathManagerComponent extends Component{
    constructor(props){
        super(props);
        const { dispatch } = this.props;
        dispatch(PathActions.getPaths())
        dispatch(restActions.restGet('/users', restConstants.GET_USERS_REQUEST));
        dispatch(restActions.restGet(
            backendURL + '/api/public-access-active',
            restConstants.GET_PUBLIC_ACCESS_ACTIVE));

        this.pathChange = this.pathChange.bind(this);
        this.onPublicAccessChange = this.onPublicAccessChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userReducer, dispatch } = this.props;
        if (userReducer.newUser !== prevProps.userReducer.newUser) {
            dispatch(restActions.restGet('/users', restConstants.GET_USERS_REQUEST));
        }
    }
    pathChange(pathId, userId){
        const { dispatch } = this.props;
        const user = {
            id: userId,
            path_id: pathId
        };
        dispatch(restActions.restPost(user,'/users', restConstants.POST_USER_REQUEST));

    }
    onPublicAccessChange(){
        const { publicAccessActive, dispatch } = this.props;
            dispatch(restActions.restPost(
                {active: !publicAccessActive},
                'public-access',
                restConstants.POST_PUBLIC_ACCESS_ACTIVE))
    }

    render() {
        const { userReducer, paths, classes, publicAccessActive, dispatch} = this.props;
        return(
            <div className={classes.root}>
                {userReducer
                    .users
                    .filter(user => (user.username !== 'admin'))
                    .map(user => (
                    <Grid key={user.id} className={classes.grid}>
                        <UserCard
                            paths={paths}
                            classes={classes}
                            user={user}
                            pathChange={this.pathChange}
                            publicAccess={publicAccessActive.active}
                            dispatch={dispatch}
                            publicAccessChange={this.onPublicAccessChange}
                        />
                    </Grid>
                ))}
        </div>)
    }
}

function UserCard(props){
    const { classes, user, paths, pathChange, publicAccess, publicAccessChange } = props;
    if (user.username === 'guest'){
        return(
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" >
                        guest
                    </Typography>
                    <br/>
                    Publiczny dostep:
                    <Switch
                    checked={publicAccess}
                    onChange={publicAccessChange}
                    />
                </CardContent>
            </Card>
        )
    }
    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" >
                    {user.username}
                </Typography>
                <br/>


                <PathSelectorComponent
                    pathId={user.path_id ? user.path_id : ''}
                    paths={paths}
                    pathChange={e=> {
                        pathChange(e, user.id)
                    }}
                    allEvents={false}
                />

            </CardContent>
        </Card>
    )
}

function mapStateToProps(state) {
    const { userReducer } = state;
    const { paths } = state.pathReducer;
    const { publicAccessActive } = state.publicAccessActiveReducer;
    return { userReducer, paths, publicAccessActive }
}
const styles = {
    root: {
        display: 'inline-block'
    },
    card: {
        paddingBottom: 15,
        margin: 50,
    },
    grid: {
         display: 'inline-block'
    }
};

export default connect(mapStateToProps)(withStyles(styles)(UserPathManagerComponent));