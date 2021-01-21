import React, { Component } from 'react';
import BreadCrump from '../BreadCrump/BreadCrump';
import './reusablecheckout.css';
import { Link, Redirect } from "react-router-dom";
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import ClipLoader from "react-spinners/ClipLoader";



export default class Checkout extends Component {
    state = {
        noCarts:false,
        carts:[],
        message:'',
        phone:'',
        address:'',
        requiredPhone:false,
        requiredAddress:false,
        invalidAddress:false,
        invalidPhone:false,
        invalidMessage:false,
        submitErr:false,
        submitedSuccess:false

    }
    componentDidMount(){
       
        this.props.footer();
        ApiClient().get('api/all-carts')
        .then(response => {
          if(response.data.carts.length){
              response.data.carts.map(el => {
                this.setState({
                    carts:[...this.state.carts,[el.cartId,el.name,el.currentPrice,el.productQuantity]]
                })
                return el;
              }) 
              this.setState({
                noCarts:false
            })
          }
          else{
              this.setState({
                  noCarts:true
              })
          }
        })
    }
    // handel Change Start
    handleChange = (event) => {
        this.setState({
            [event.target.id]:event.target.value
        })

    
        if(event.target.id === 'address'){
        if(event.target.value.length > 10){
            this.setState({
                requiredAddress:false
            })
        }
        else{
            this.setState({
                requiredAddress:true
            })
        }
        if(event.target.value.length > 60){
            this.setState({
                invalidAddress:true
            })
        }
        else{
            this.setState({
                invalidAddress:false
            })
        }
        }
       
        if(event.target.id === 'phone'){
            if(event.target.value.length === 11){
                this.setState({
                    requiredPhone:false
                })
            }
            else{
                this.setState({
                    requiredPhone:true
                })
            }
            if(event.target.value.length >= 12 || isNaN(event.target.value)){
                this.setState({
                    invalidPhone:true
                })
            }
            else{
                this.setState({
                    invalidPhone:false
                })
            }
            
        }
        if(event.target.id === 'message'){
            if(event.target.value.length >= 200){
                this.setState({
                    invalidMessage:true
                })
            }
            else{
                this.setState({
                    invalidMessage:false
                })
            }
            
        }
    
    }
    // Handle Change End
// Handle Submit Start
handleSubmit = (event) =>{
event.preventDefault();
this.setState({
    submitErr:false
})
if(this.state.phone && this.state.address){
    if(this.state.invalidAddress || this.state.invalidMessage || this.state.invalidPhone || this.state.requiredAddress || this.state.requiredPhone){
        this.setState({
            submitErr:true
        })
        console.log('Err')
    }
    else{
        ApiClient().post('api/place-orders',{
            address:this.state.address,
            phone:this.state.phone,
            message:this.state.message
        })
        .then(response =>{
            this.setState({
                submitedSuccess:true
            })
        })
    }
    
}
else{
this.setState({
    submitErr:true
})

}

}
// HAndle Submit Ends

    render() {
        if(this.state.submitedSuccess){
            return <Redirect to='active-orders'/>
        }
       
        if(this.state.noCarts){
            return (
                <div className='container my-5'>
                     <div className='row my-5'>
                     <div className='col-12 text-center my-5'>
    <p className='display-3' >You do not have any product added in your cart </p>
                </div>
    
                </div>
                </div>)
        }
       else if(this.state.carts.length){
        const formStyle = {
            border:'1px solid black'
        }
           const findTotal = this.state.carts.map(el => {
               return el[2] * el[3]
           })
           const total = findTotal.reduce((a,b) => {
               return a + b
           })
        return (
            <React.Fragment>
             <BreadCrump page='Check Out'>
                  <Link to="/shop/all">Shop</Link>
            </BreadCrump>   
            <section className="checkout-section spad">
        <div className="container">
            <form  className="checkout-form">
                <div className="row">
                    <div className="col-lg-6"> 
                        <h4>Biiling Details</h4>
                        <div className="row ">
                            <div className="col-lg-12">
                                <label htmlFor="address">Street Address<span>*</span></label>
                                <input onChange={this.handleChange} value={this.state.address} style={formStyle} type="text" id="address" />
                                {
                                    this.state.requiredAddress?
                                    <div className='alert alert-danger '>
                                 <span>Address is required</span>
                                    </div>:
                                    this.state.invalidAddress?
                                    <div className='alert alert-danger '>
                                 <span>Address length is too big</span>
                                    </div>:
                                    null
                                }
                               
                            </div>
                            <div className="col-lg-6">                    
      <label  htmlFor="phone">Phone <span>*</span></label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">+88</div>
        </div>
        <input onChange={this.handleChange} value={this.state.phone} style={formStyle} type="text" className="form-control" id="phone" />
      </div>

                              
                                {
                                    this.state.invalidPhone?
                                    <div className='alert alert-danger '>
                            <span>Invalid Phone Number</span>
                                    </div>:
                                    this.state.requiredPhone?
                                    <div className='alert alert-danger '>
                                             <span>Phone number is required</span>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="col-lg-12 form-group">
                              <label htmlFor="message">Message</label>
                              <textarea style={formStyle} 
                              value={this.state.message}
                              className="form-control" onChange={this.handleChange} id="message" rows="3">
                              </textarea>
                              {
                                    this.state.invalidMessage?
                                    <div className='alert alert-danger '>
                                 <span>Message is too big</span>
                                    </div>
                                   
                                    : null
                                }
                            </div>
                            
                        
                        </div>
                    </div>
                    <div className="col-lg-6">
                       
                        <div className="place-order">
                            <h4>Your Order</h4>
                            <div className="order-total">
                                <ul className="order-table">
                                    <li>Product <span>Total</span></li>
                                    {
                                        this.state.carts.map(el => {
                                            return ( 
                                            <li  
                                            key={el[0]}
                                            className="fw-normal">{el[1]} x {el[3]}<span>{el[2] * el[3]}&#2547;</span></li>)
                                        })
                                    }
                                   
                                    
                                    <li className="total-price">Total
                                    <span>
                                    { total} &#2547;</span></li>
                                </ul>
                                {
                                   this.state.submitErr?  <div className='alert alert-danger'>
                                 <span>Fill up the form correctly</span>
                                 </div>
                                 :
                                 null
                                }
                                <div >
                                    <button onClick={this.handleSubmit} type="submit" className="btn btn-dark btn-block py-2 mt-2">Place Order</button>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
            
        </React.Fragment>
        )
        }
        else{
            return   (
                <React.Fragment>
                <div className='row mx-auto text-center'>
                <div className="col-12 ">
                   <ClipLoader
                       color={'#292929'}
                       loading={this.state.loading}
                   />
                   </div>
                </div>
               
            </React.Fragment>
              )
        }
      
    }
}
