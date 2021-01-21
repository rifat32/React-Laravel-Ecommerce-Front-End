import React, { Component } from 'react';
import './auth.css';
import BreadCrump from '../BreadCrump/BreadCrump';
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import { Link } from "react-router-dom";


export default class Login extends Component {
    state = {
        userName:'',
        email:'',
        password:'',
        password_confirmation:'',
        err:''
    }
    componentDidMount(){
        this.props.footer();
    }
    handleChange = (event) => {  
this.setState({
    [event.target.id]:event.target.value
})
    }
    registerSubmit = (event) => {
        this.setState({
            err:''
        })
        event.preventDefault();
        ApiClient().get('/sanctum/csrf-cookie')
        .then(response => {
            ApiClient().post('/api/register', {
                userName:this.state.userName,
                email: this.state.email,
                password: this.state.password,
                password_confirmation:this.state.password_confirmation
            }).then(response => {
                this.setState({
                    password:'',
                    password_confirmation:''
                })
                if(response.data.err){
                    this.setState({
                        err:response.data.err
                    })
                }
                else{
                    this.setState({
                        err:''
                    })
                    this.props.loggedIn(response.data.user,response.data.token)
                }
              
            })
        });
    }    

    render() {
        const style = {border:'1px solid black'}
        return (
            <React.Fragment>
             <BreadCrump page='Register'/>   
             <div className="register-login-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="register-form">
                        <h2>Register</h2>
                        {
                                    this.state.err.includes("emailExistGoogleErr")?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Please login with google. You have an account with goole login.</span>
                                    </div>:
                                    null
                                    
                                }
                        <form onSubmit={this.registerSubmit}>
                            <div className="group-input">
                                <label htmlFor="userName">Username </label>
                                <input type="text" id="userName" value={this.state.userName} onChange={this.handleChange} style={style}/>
                                {
                                    this.state.err.includes("nameLengthErr")?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Name must be between 5 and 20 characters</span>
                                    </div>:
                                    null
                                    
                                }
                                 {
                                    (!this.state.err.includes("nameLengthErr")&&this.state.err.includes("nameContainsErr"))?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Only letters and white space allowed</span>
                                    </div>:
                                    null
                                    
                                }
                               
                            </div>
                            <div className="group-input">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" value={this.state.email} onChange={this.handleChange} style={style}/>
                                {
                                    this.state.err.includes("emailFormateErr")?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Email must be valid.</span>
                                    </div>:
                                    null
                                    
                                }
                                 {
                                    (!this.state.err.includes("emailFormateErr")&&this.state.err.includes("emailExistErr"))?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Email has already been taken</span>
                                    </div>:
                                    null
                                    
                                }
                            </div>
                            <div className="group-input">
                                <label htmlFor="password">Password </label>
                                <input type="text" id="password" value={this.state.password} onChange={this.handleChange} style={style}/>
                                {
                                    this.state.err.includes("passwordLengthErr")?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Password must be greater than 6 characters</span>
                                    </div>:
                                    null
                                    
                                }
                                 {
                                    (!this.state.err.includes("passwordLengthErr")&&this.state.err.includes("passwordMatchErr"))?
                                    <div className='alert alert-danger mt-3'>
                                    <span>Those passwords didn't match</span>
                                    </div>:
                                    null
                                    
                                }
                            </div>
                            <div className="group-input">
                                <label htmlFor="password_confirmation">Confirm Password *</label>
                                <input type="text" id="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} style={style}/>
                            </div>
                            <button type="submit" className="site-btn register-btn">REGISTER</button>
                        </form>
                        <div className="switch-login">
                            <Link to="/login" className="or-login">Or Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
        </React.Fragment>
        )
    }
}
