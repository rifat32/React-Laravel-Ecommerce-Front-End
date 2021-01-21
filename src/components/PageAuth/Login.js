import React, { Component } from 'react';
import './auth.css';
import BreadCrump from '../BreadCrump/BreadCrump';
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import { Link } from "react-router-dom";
import GoogleLogin from 'react-google-login';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            err:'',
            googleFail:false
        };
    
        this.changeHandle = this.changeHandle.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    componentDidMount(){
        this.props.footer();
    }
    changeHandle(event){
     
        this.setState({
            [event.target.id]: event.target.value
        })
      
    }
    loginSubmit(event) {
        event.preventDefault();
        this.setState({
            err:'',
            googleFail:false
        })
        ApiClient().get('/sanctum/csrf-cookie')
        .then(response => {
            ApiClient().post('/api/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({
                    password:''
                })
                if(response.data.message){
                    this.setState({
                        err:response.data.message
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
    responseGoogle = (response) => {
        const email = response.profileObj.email;
        const gToken = response.googleId;
        const name =  response.profileObj.givenName.concat(response.profileObj.familyName)
        console.log(email,gToken,name)
        ApiClient().get('/sanctum/csrf-cookie')
        .then(response => {
            ApiClient().post('/api/google-login', {
                gToken:gToken,
                email: email,
                name: name
            }).then(response => {
       
                    this.props.loggedIn(response.data.user,response.data.token)
                
        
            })
            
        });
          }
    responseGoogleFail = (err) => {
        console.log(err)
this.setState({
    googleFail:true
})
    }      

    render() {
        const style = {border:'1px solid black'}
        return (
            <React.Fragment>
             <BreadCrump page={'Login'}/>   
            <div className="register-login-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="login-form">
                            <h2>Login</h2>
                            <div className='row'>
                                <div className='col-12 text-center'>
                                <GoogleLogin
        clientId='834833624183-onqgtoa05o5r52k93gspi112e1grtc3k.apps.googleusercontent.com'
        buttonText='Login With Google'
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogleFail}
        cookiePolicy='single_host_origin'
  
        />
                                </div>
                           
                            </div>

                            {
                        this.state.googleFail?
                             <div className='mb-3 mx-auto text-center'>
                             <span className='alert alert-danger'>Google Login Fail</span>
                         </div>:
                         null
                        } 
                            {
                        this.state.err?
                             <div className='mb-3 mx-auto text-center'>
                             <span className='alert alert-danger'>{this.state.err}</span>
                         </div>:
                         null
                        }
                           
                            <form onSubmit={this.loginSubmit}>
                                <div className="group-input">
                                    <label htmlFor="email">Email address *</label>
                                    <input style={style} value={this.state.email}   type="text" id="email"  onChange={this.changeHandle}/>
                                </div>
                                <div className="group-input">
                                    <label  htmlFor="password">Password *</label>
                                    <input style={style} value={this.state.password} id='password' key='password' type="text"  onChange={this.changeHandle}/>
                                </div>
                                <div >
                                     <Link to="/reset-password-email" className="btn btn-default mb-2">Forget your Password</Link>
                                    
                                </div>
                              
                                <button type="submit" className="site-btn login-btn">Sign In</button>
                            </form>
                            <div className="switch-login">
                                <Link to="/register" className="or-login">Or Create An Account</Link>
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
