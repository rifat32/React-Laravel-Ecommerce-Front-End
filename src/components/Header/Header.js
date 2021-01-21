import React, { Component } from 'react';
import Script from './HeaderScript';
import { Link } from "react-router-dom";
import Nav from './Nav/Nav';
import './header.css';


export default class Header extends Component {
state = {
    search:''
}
componentDidMount(){
     Script();
    
}
topNav = () => {
  const navClass =  document.querySelector('#nav-menu');
  navClass.classList.toggle('display');
}
handleChange = (event) => {
    this.setState({
        [event.target.id]:event.target.value
    })
  
   
    
}
handleManualSubmit = (event) => {
    let x = event.which || event.keyCode;
    if(x === 13){
        this.props.searched(true,this.state.search)
    }
    

}
handleSubmit = () => {
    this.props.searched(true,this.state.search)
}
    render() {
       const {email,phone,facebook,twitter,instagram,linkedin} = this.props.infos;
      
        return (
            <header className="header-section">
        <div className="header-top">
            <div className="container">

                <div className="ht-left">

                {email?
                        <div className="mail-service">
                        <i className=" fa fa-envelope"></i>
                        {email}
                    </div>
                        :
                        null}
                     {phone?
                        <div className="phone-service">
                        <i className=" fa fa-phone"></i>
                       {phone}
                    </div>
                        :
                        null}
                    
                </div>
                <div className="ht-right">
                <div className="login-panel">
                {this.props.userName? <Link onClick={this.props.logout} to="/" className='mr-4 bg-danger py-2 px-3'>Logout</Link>:null}
                    {this.props.userName? null: <Link to="/register" className='mr-4'>Register</Link>}
                    {this.props.userName? null: <Link to="/login">Login</Link>}
                </div>



                    <div className="top-social">
                        {facebook?
                         <a rel='noopener noreferrer' target='_blank' href={facebook}><i className="ti-facebook"></i></a>
                        :
                        null}
                        {twitter?
                         <a rel='noopener noreferrer' target='_blank' href={twitter}><i className="ti-twitter-alt"></i></a>
                        :
                        null}
                        {linkedin?
                         <a rel='noopener noreferrer' target='_blank' href={linkedin}><i className="ti-linkedin"></i></a>
                        :
                        null}
                        {instagram?
                         <a rel='noopener noreferrer' target='_blank' href={instagram}><i className="ti-instagram"></i></a>
                        :
                        null}
                       
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="inner-header">
                <div className="row">
                    <div className="col-lg-2 col-md-2">
                        <div className="logo">
                            <Link to="/">
                                <img src="./img/logo.png" alt="Logo"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                        <div className="advanced-search">
                        <button  type="button" className="category-btn">All Categories</button>
                        
                        <div className="input-group">
                                <input value={this.state.search} onChange={this.handleChange} onKeyPress={this.handleManualSubmit} id='search' style={{fontWeight: 'bold', color:'black',border:'1px solid black'}} type="text" placeholder="What do you need?"/>
                                <button onClick={this.handleSubmit} type="button"><i className="ti-search"></i></button>
                            </div>
                       
                            
                        </div>
                    </div>
                    <div className="col-lg-3 text-right col-md-3">
                        <br/>
                        <br/>
                     
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-item" id='nav-item'>
            <div className="container">
            <button className='btn btn-brimary bg-primary' id='navIcon' onClick={this.topNav} >
                     <i className="fa fa-bars"></i>
           </button>
           
               <Nav logout={this.props.logout} userName={this.props.userName}  /> 
               
                
                

           
            </div>
        </div>
    </header>
        )
    }
}

