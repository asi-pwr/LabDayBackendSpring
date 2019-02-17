
import React, { Component } from "react";
import {connect} from "react-redux";
import {userActions} from "../actions/UserActions";
import {Redirect} from "react-router";

class Logout extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        if (!sessionStorage.getItem('token')){
            return <Redirect to="/"/>
            window.location.reload(true);
        }
    }
}

const LogoutPage = connect()(Logout);
export {LogoutPage as Logout };