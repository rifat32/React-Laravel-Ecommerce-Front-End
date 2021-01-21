import React, { Component } from 'react';
import BreadCrump from '../BreadCrump/BreadCrump';
import '../PageCheckout/reusablecheckout.css';
import { Link } from "react-router-dom";
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import ClipLoader from "react-spinners/ClipLoader";



export default class Checkout extends Component {
    state = {
        noCarts:false,
        carts:[],
        quantity:this.props.match.params.quantity,
        message:'',
        phone:'',
        address:'',
        email:'',
        name:"",
        requiredName:false,
        requiredEmail:false,
        requiredPhone:false,
        requiredAddress:false,
        invalidAddress:false,
        invalidPhone:false,
        invalidMessage:false,
        invalidEmail:false,
        invalidName:false,
        submitErr:false,
        submitedSuccess:false

    }
    componentDidMount(){
       
        this.props.footer();
        ApiClient().get(`api/order-now-unauth/${this.props.match.params.id}`)
        .then(response => {
          if(response.data.product.length){
              response.data.product.map(el => {
                this.setState({
                    carts:[el.name,el.currentPrice]
                })
                return el
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

    if(event.target.id === 'email'){
       
          if(event.target.value.length > 8){
            this.setState({
                requiredEmail:false
            })
        }
        else{
            this.setState({
                requiredEmail:true
            })
        }
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value)){
            this.setState({
                invalidEmail:false
            })
        }
        else{
            this.setState({
                invalidEmail:true
            })
        }
    }
    if(event.target.id === 'name'){
        if(event.target.value.length > 3){
            this.setState({
                requiredName:false
            })
        }
        else{
            this.setState({
                requiredName:true
            })
        }
        if(event.target.value.length > 25){
            this.setState({
                invalidName:true
            })
        }
        else{
            this.setState({
                invalidName:false
            })
        }
        }
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
    if(this.state.invalidAddress || this.state.invalidMessage || this.state.invalidPhone || this.state.requiredAddress || this.state.requiredPhone || this.state.requiredName || this.state.invalidName || this.state.requiredEmail || this.state.invalidEmail){
        this.setState({
            submitErr:true
        })
        
    }
    else{
        ApiClient().post('api/order-now-unauth-post',{
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            phone:this.state.phone,
            message:this.state.message,
            productId:this.props.match.params.id,
            productQuantity:this.state.quantity
        })
        .then(response =>{
            this.setState({
                submitedSuccess:true,
                address:'',
                phone:'',
                message:'',
                name:'',
                email:''
            })
            setTimeout(()=> {
this.setState({
    submitedSuccess:false,
})
            },4000)
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
     
        if(this.state.noCarts){
            return (
                <div className='container my-5'>
                     <div className='row my-5'>
                     <div className='col-12 text-center my-5'>
    <p className='display-3' >Nothing to show </p>
                </div>
    
                </div>
                </div>)
        }
       else if(this.state.carts.length){
        const formStyle = {
            border:'1px solid black'
        }
           
           const total = this.state.carts[1] * this.state.quantity
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
                        <div className="row">
                        <div className="col-lg-6">
                                <label htmlFor="name">Name<span>*</span></label>
                                <input onChange={this.handleChange} value={this.state.name} style={formStyle} type="text" id="name" />
                                {
                                    this.state.requiredName?
                                    <div className='alert alert-danger '>
                                 <span>Name is required</span>
                                    </div>:
                                    this.state.invalidName?
                                    <div className='alert alert-danger '>
                                 <span>Name length is too big</span>
                                    </div>:
                                    null
                                }
                               
                            </div>  
                              <div className="col-lg-6">
                                <label htmlFor="email">Email<span>*</span></label>
                                <input onChange={this.handleChange} value={this.state.email} style={formStyle} type="text" id="email" />
                                {
                                    this.state.requiredEmail?
                                    <div className='alert alert-danger '>
                                 <span>Email is required</span>
                                    </div>:
                                    this.state.invalidEmail?
                                    <div className='alert alert-danger '>
                                 <span>You have entered an invalid email address!</span>
                                    </div>:
                                    null
                                }
                               
                            </div>  
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
                                       
                       <li  className="fw-normal">{this.state.carts[0]} x {this.state.quantity}<span>{this.state.carts[1] * this.state.quantity}&#2547;</span></li>
                                       
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
                                {
                                    this.state.submitedSuccess?<div className='alert alert-success'>
                                    <span>Order Placed Successfully</span>
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
