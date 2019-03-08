import React from "react";
import {connect} from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {userActions} from "../actions/UserActions";
import {Redirect} from "react-router";

class RegisterComponent extends React.Component {

    state = {
        error: '',
        postSuccess: false,
        name: '',
        password: '',
    }
    constructor(props){

        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(){
        const { dispatch } = this.props;
        const { name, password } = this.state;
        if (name && password){
            dispatch(userActions.register(name,password));
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { newUser, status } = this.props;
        if (status !== prevProps.status && status === 400){
            this.setState({
                error: 'Użytkownik z taką nazwą już istnieje'
            })
        }
        if (newUser !== prevProps.newUser && newUser !== undefined){
            this.setState({
                postSuccess: true
            })
        }
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    render() {
        const { postSuccess, error} = this.state;
        const { loggedIn } = this.props

        if (postSuccess){
            return loggedIn ? ( <Redirect to ='/users'/>) : ( <Redirect to ='/'/>)
        }
        return(

            <div>
                <br/>
                <h3>Nowe konto</h3>
                <p>{error}</p>
                <MuiThemeProvider>
                    <React.Fragment>
                        <TextField
                            floatingLabelText="nazwa"
                            onChange={this.handleChange('name')}
                        />
                        <br/>
                        <TextField
                            type="password"
                            floatingLabelText="hasło"
                            onChange={ this.handleChange('password') }
                        />
                        <br/>
                        <RaisedButton
                            label="dodaj"
                            primary = {true}
                            onClick = {this.handleSubmit}
                        />
                    </React.Fragment>
                </MuiThemeProvider>
            </div>

        )
    }
}
function mapStateToProps(state){
    const { newUser, status } = state.userReducer;
    const { loggedIn } = state.authentication;
    return { newUser, status, loggedIn };
}

export default connect(mapStateToProps)(RegisterComponent);