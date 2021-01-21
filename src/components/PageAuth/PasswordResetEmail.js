import React, { Component } from 'react';
import './auth.css';
import BreadCrump from '../BreadCrump/BreadCrump';
import ApiClient from '../../Scripts/ApiClient/ApiClient';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            err:false,
            success:false
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
      

            ApiClient().post('/api/password/email', {
                email: this.state.email,
            }).then(response => {
                console.log(response.data.error.message)
                if(response.data.success.message){
this.setState({
    success:true
})
                }
                else{
                    this.setState({
                        err:true
                    })
                }
               
             
            })
            .catch(err => 
                {
                    this.setState({
                        err:true
                    })
                    console.log(err)
                }
                
                )
             
            
     
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
                            {
                        this.state.err?
                             <div className='mb-3 mx-auto text-center'>
                             <span className='alert alert-danger'>Some thing went wrong</span>
                         </div>:
                         null
                        }
                          {
                        this.state.success?
                             <div className='mb-3 mx-auto text-center'>
                             <span className='alert alert-danger'>We have send an email</span>
                         </div>:
                         null
                        }
                           
                            <form onSubmit={this.loginSubmit}>
                                <div className="group-input">
                                    <label htmlFor="email">Send password reset email </label>
                                    <input style={style} value={this.state.email}   type="text" id="email"  onChange={this.changeHandle}/>
                                </div>
                                <button type="submit" className="site-btn login-btn">Send Email</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
        )
    }
}
