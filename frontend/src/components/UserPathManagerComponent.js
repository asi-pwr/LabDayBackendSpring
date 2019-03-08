import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {restActions} from "../actions/restActions";
import {restConstants} from "../constants/restConstants";

class UserPathManagerComponent extends Component{
    constructor(props){
        super(props);
        const { dispatch } = this.props;
        dispatch(restActions.restGet('/users', restConstants.GET_USERS_REQUEST));
    }

    render() {
        return(
            <div>

        </div>)
    }
}
export default connect()(UserPathManagerComponent);