import React,{Component} from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ApiClient from './Scripts/ApiClient/ApiClient';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

class App extends Component {
  state = {
    userName:'',
    infos:'',
    footer:'',
    searched:false,
    query:'',
  }

  login = (user,token)=>{ 
    window.localStorage.setItem('auth_token',token);
    window.localStorage.setItem('userId',user.id);
    window.localStorage.setItem('userName',user.name);
    window.localStorage.setItem('userEmail',user.email);
    const userName = localStorage.getItem('userName')
    this.setState({  
    userName:userName,
    }) 
    window.history.back();
  }
  logout = ()=>{
    localStorage.clear()
    this.setState({  
    userName:'',
    })
    
  }
  componentDidMount(){
  
    const userName = localStorage.getItem('userName')
      this.setState({
      userName:userName,
      })
      ApiClient().get('/api/infos')
      .then(response => {
        this.setState({
          infos:response.data.infos[0]
        })  
       }) 
      
   console.log(this.state.footer)
    }
    footerWillShow = (el=false) => {
      if(window.location.pathname.substr(1,5) === 'shop/'){
  this.setState({
    footer:false
  })
        }
        if(el){
          this.setState({
            footer:false
          })
        }
        
       
        else{
          this.setState({
            footer:true
          })
        }
        
    }
    searched = (searched,query) => {
this.setState({
  searched:searched,
  query:query
})
setTimeout( () => {
 this.setState({
  searched:false,
  query:''
 }) 
 
  
},10)


 }
  

    
  
 
  render(){
  
    return (
      
      <Router>
        {/* <Preloader/> */}
          <Header userName={this.state.userName} logout={this.logout} infos={this.state.infos} categories={this.state.categories} searched={this.searched} />
          <Switch>
    {
      this.state.searched?
      <Redirect to={`/shop/search-${this.state.query}`}/>:null
    }
   
    <Route
    exact
    path="/"
    render={() => {
      return    <Redirect from='/' to='/shop/all'/>;
    }}
    />
    
    
    <Route
    exact
    path="/contact"
    render={() => {
     const Contact = require('./components/PageContact/Contact').default;
      return    <Contact infos={this.state.infos} footer={this.footerWillShow}/>;
    }}
    />
{this.state.userName?<Redirect from="/login" to="/" />:<Route
    exact
    path="/login"
    render={() => {
     const Login = require('./components/PageAuth/Login').default;
      return    <Login loggedIn={this.login} footer={this.footerWillShow}/>;
    }}
/>}
<Route
    exact
    path="/reset-password-email"
    render={() => {
     const PassResEmail = require('./components/PageAuth/PasswordResetEmail').default;
      return    <PassResEmail  footer={this.footerWillShow}/>;
    }}
/>

    {this.state.userName?<Redirect from="/register" to="/" />:<Route
    exact
    path="/register"
    render={() => {
     const Register = require('./components/PageAuth/Register').default;
      return    <Register loggedIn={this.login} footer={this.footerWillShow}/>;
    }}
    />}
   
     

    <Route
    path="/faq"
    render={() => {
     const Faq = require('./components/PageFaq/Faq').default;
      return    <Faq footer={this.footerWillShow}/>;
    }}
    />
    <Route
    path="/shopping-cart"
    render={() => {
     const ShoppingCart = require('./components/PageShoppingCart/ShoppingCart').default;
      return    <ShoppingCart footer={this.footerWillShow}/>;
    }}
    />
      <Route
    path="/active-orders"
    render={() => {
     const ActiveOrders = require('./components/PageActiveOrders/ActiveOrders').default;
      return  <ActiveOrders footer={this.footerWillShow}/>;
    }}
    />
   
   
   <Route
    path="/checkout"
    render={() => {
     const Checkout = require('./components/PageCheckout/Checkout').default;
      return    <Checkout footer={this.footerWillShow}/>;
    }}
    />
    
   
    <Route
    path="/shop/:id"
    render={({ match }) => {
     const Shop = require('./components/PageShop/Shop').default;
      return    <Shop searched={this.searched}   footer={this.footerWillShow} match={match} />;
    }}
    />
    <Route
    path="/order-now-auth/:id/:quantity"
    render={({ match }) => {
     const OrderNowAuth = require('./components/PageOrderNow/OrderNowAuth').default;
      return    <OrderNowAuth   footer={this.footerWillShow} match={match} />;
    }}
    />
    {
      this.state.userName?
      null:
      <Route
      path="/order-now-unauth/:id/:quantity"
      render={({ match }) => {
       const OrderNowUnuth = require('./components/PageOrderNow/OrderNowUnauth').default;
        return    <OrderNowUnuth   footer={this.footerWillShow} match={match} />;
      }}
      />
    }
    

    

  </Switch>
  {
   
    this.state.footer?
      <Footer infos={this.state.infos}/>
      :
      null
    
  }
 
  </Router>

  );
  }
  
}

export default App;