import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/LoginForm.css'
import labdayLogo from '../labday.png'
import { FaUser, FaKey } from 'react-icons/fa'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import {userActions} from "../actions/UserActions";

class LoginForm extends React.Component{


    handleSubmit(event){
        event.preventDefault();
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username,password));
        }
        this.setState({ submitted: true });
    }

    constructor(props){
        super(props);
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        this.state = {
            username: "",
            password: "",
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        const { submitted } = this.state;
        const { loggedIn, newUser, error } = this.props;
        if (submitted && loggedIn)
                return <Redirect to='/dashboard' />

        return(
            <div>
                <br/><br/>
                <p className="text-success text-center">{newUser === undefined ? "" : "Stworzono konto"}</p>

                <img src={labdayLogo} className="center" alt="Labday logo"/>
                
            <div className="card divStyle">

                <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Logowanie</h4>
                    <hr />
                    {(submitted && error) ?
                        <p className="text-danger text-center">Coś poszło nie tak</p>
                        : <p className="text-success text-center">Aby kontynuować, zaloguj się<br/> na konto admina</p>
                    }
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> 
                                        <FaUser />
                                    </span>
                                </div>
                                <input name="username" 
                                className="form-control" 
                                placeholder="Login" 
                                type="text" 
                                onChange={this.handleChange}
                                value={this.state.username}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FaKey />
                                    </span>
                                </div>
                                <input name="password"
                                className="form-control" 
                                placeholder="******" 
                                type="password" 
                                onChange={this.handleChange}
                                value={this.state.password}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={this.handleSubmit}>
                                Zaloguj
                            </button>
                        </div>
                    </form>
                </article>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {  user, loggedIn, error } = state.authentication;
    const { newUser } = state.userReducer;
    return {  user, loggedIn, newUser, error };
}


const LoginPage = connect(mapStateToProps)(LoginForm);
export { LoginPage as LoginForm } ;
