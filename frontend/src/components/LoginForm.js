import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/LoginForm.css'
import labdayLogo from '../labday.png'
import { FaUser, FaKey } from 'react-icons/fa'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { Redirect } from 'react-router'

class LoginForm extends React.Component{


    handleSubmit(event){
        const apiBaseUrl = "http://193.33.111.235:5436/api";
        const params = new URLSearchParams();
        params.append('username',this.state.username);
        params.append('password',this.state.password);
        const configUrlEncoded = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        axios.post(apiBaseUrl + '/login', params,configUrlEncoded)
            .then( response => {
                console.log(response.status)
                if (response.status === 200) {
                    this.setState({token: response.data})
                }
            })
            .catch(error =>{
                console.log(error)
                console.log('error with request to:' + apiBaseUrl + '/login')
            });
    }

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",    // <--- should this be done this way?
            token: ""
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
        const { token } = this.state;
        if (token !== ""){
            return <Redirect to='/dashboard' />
        }
        return(
            <div>
            <img src={labdayLogo} className="center" alt="Labday logo"/>
                
            <div className="card divStyle">
            
                <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Logowanie</h4>
                    <hr />
                    <p className="text-success text-center">Aby kontynuować, zaloguj się</p>
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
                            <MuiThemeProvider>
                            <RaisedButton
                            // className="btn btn-primary btn-block"
                            onClick={this.handleSubmit}>
                                Zaloguj  
                            </RaisedButton>
                            </MuiThemeProvider>
                        </div>
                    </form>
                </article>
            </div>
            </div>
        )
    }
}

export default LoginForm;