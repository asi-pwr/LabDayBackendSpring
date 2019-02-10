import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/LoginForm.css'
import labdayLogo from '../labday.png'
import { FaUser, FaKey } from 'react-icons/fa'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: "",
            password: ""    // <--- should this be done this way?
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

    handleSubmit(event){

    }

    render(){
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
                            <button type="submit" 
                            className="btn btn-primary btn-block"
                            onSubmit={this.handleSubmit}> 
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

export default LoginForm;