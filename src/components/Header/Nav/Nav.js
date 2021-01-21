import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
export default class Nav extends Component {
  
    
    
    render() {
       
        return (
            <nav className="nav-menu" id='nav-menu' >
                  <ul>
                        
                        <li><NavLink to='/shop/all'
                        activeClassName="active">shop</NavLink></li>
                        
                        <li><NavLink to="/contact" exact
                        activeClassName="active">Contact</NavLink></li>
                        <li><NavLink to="/faq" exact
                        activeClassName="active">Faq</NavLink></li>
                        {this.props.userName?<li><NavLink to="/shopping-cart" exact
                        activeClassName="active">Shopping Cart</NavLink></li>:null}
                        {this.props.userName? <li><NavLink to="/checkout" exact
                        activeClassName="active">Checkout</NavLink></li>:null}
                          {this.props.userName? <li><NavLink to="/active-orders" exact
                        activeClassName="active">Active Orders</NavLink></li>:null}
                        {this.props.userName? <li><NavLink onClick={this.props.logout} to="/" 
                        className="bg-danger">Logout</NavLink></li>
                        :null
                        }
                         {this.props.userName? 
                        null:
                        <li><NavLink  to="/login" exact
                        activeClassName="active">Login</NavLink></li>
                        }
                          {this.props.userName? 
                        null:
                        <li><NavLink  to="/register"  exact
                        activeClassName="active">Register</NavLink></li>
                        }
                      
                       
                       
                    </ul>
                </nav>
        )
    }
}
