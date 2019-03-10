import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/LoginForm.css'
import labdayLogo from '../labday.png'
import { FaEnvelope, FaInfo } from 'react-icons/fa'

class BugForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            email: "",
            message: "",
            wasSent: false,
            wasClicked: false
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
        this.setState({
                email: "",
                message: "",
                wasSent: true
        })
        event.preventDefault();
    }

    render(){
        return(
            <div>
            <img src={labdayLogo} className="center" alt="Labday logo"/>
                
            <div className="card divStyle">
            
                <article className="card-body">
                    <h4 className="card-title text-center mb-4 mt-1">Zgłoś błąd</h4>
                    {this.state.wasSent && <p className="text-success text-center">Zgłoszenie zostało wysłane. Dziękujemy.</p>}
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> 
                                        <FaEnvelope />
                                    </span>
                                </div>
                                <input name="email" 
                                className="form-control" 
                                placeholder="E-mail" 
                                type="email" 
                                onChange={this.handleChange}
                                value={this.state.email}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FaInfo />
                                    </span>
                                </div>
                                <textarea name="message"
                                className="form-control" 
                                onChange={this.handleChange}
                                placeholder="Opisz dokładnie znaleziony błąd."
                                value={this.state.message}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block"> 
                                Wyślij  
                            </button>
                        </div>
                    </form>
                </article>
            </div>
            </div>
        )
    }
}

export default BugForm;