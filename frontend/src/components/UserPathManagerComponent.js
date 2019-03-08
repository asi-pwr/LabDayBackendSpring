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

class UserPathManagerComponent extends Component{
    constructor(props){
        super(props);
        const { dispatch } = this.props;
        dispatch(PathActions.getPaths())
        dispatch(restActions.restGet('/users', restConstants.GET_USERS_REQUEST));

        this.pathChange = this.pathChange.bind(this);
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

    render() {
        const { userReducer, paths, classes } = this.props
        return(
            <div className={classes.root}>
                {userReducer.users.map(user => (
                    <Grid key={user.id} className={classes.grid}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography>
                                    nazwa: {user.username}
                                </Typography>

                                    <PathSelectorComponent
                                        path={user.path_id ? user.path_id :0}
                                        paths={paths}
                                        pathChange={e=> {
                                            this.pathChange(e, user.id)
                                        }}
                                        allEvents={false}
                                    />

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </div>)
    }
}

function mapStateToProps(state) {
    const { userReducer } = state;
    const { paths } = state.pathReducer;
    return { userReducer, paths }
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