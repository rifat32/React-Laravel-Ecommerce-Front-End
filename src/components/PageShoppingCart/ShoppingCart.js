import React, { Component } from 'react';
import BreadCrump from '../BreadCrump/BreadCrump';
import './reusableshoppingcart.css';
import { Link } from "react-router-dom";
import ApiClient from '../../Scripts/ApiClient/ApiClient'
import ClipLoader from "react-spinners/ClipLoader";



export default class ShoppingCart extends Component {
    _mounted = false;
    state = {
        carts:[],
        noCarts:false,
        updated:false,
        mounted:false
    }
    componentDidMount(){
       this._mounted = true;
       this.setState({
           mounted:true
       })
            this.props.footer();
       if(this._mounted){
        ApiClient().get('api/my-carts')
        .then(response => {
            
            if(!response.data.length){
                this.setState({
                    noCarts:true
                })
            }
            else{
                response.data.map(el => {
                   
                    this.setState({
                        carts:[...this.state.carts,[el.cartId,el.currentPrice,el.image_1,el.name,el.productQuantity,el.id]]
                    })
                    return el;
                })
            }

        })
       }     
       
    }
    componentWillUnmount() {
        this._mounted = false;
        this.setState({
            mounted:false
        })
    }
    deleteCart = (id,indx) => {
   if(this._mounted && this.state.mounted){
    ApiClient().post('api/delete-cart-item',{
        id:id
    })
    .then(response => {
        const carts = [...this.state.carts]
        carts.splice(indx,1)
        this.setState({
           carts:carts,
        })
        if(!this.state.carts.length){
            this.setState({
                noCarts:true
            })
        }
       
       
    })

   }
    
     
    }
    dec = (indx) => {
    if(this._mounted && this.state.mounted){
        if(this.state.carts[indx][4] > 1){
            const carts = [...this.state.carts];
            carts[indx][4] -= 1;
            this.setState({
                carts:carts
            })
        }
    }
    }
    inc = (indx) => {
        if(this._mounted){
            const carts = [...this.state.carts];
            carts[indx][4] =  parseInt(carts[indx][4]) + 1;
             this.setState({
                 carts:carts
             })
        }
        
    }
    updateCartItems = () => {
        if(this._mounted && this.state.mounted){
            ApiClient().post('api/update-cart-items',{
                items:this.state.carts
            })
            .then(response => {
                this.setState({
                    updated:true
                })
               setTimeout(() => {
                this.setState({
                    updated:false
                })
               },3000)
            })
        }
   
    }
    render() {
       
        if(this.state.noCarts){
            return (
            <div className='container my-5'>
                 <div className='row my-5'>
                 <div className='col-12 text-center my-5'>
<p className='display-3' > You have no cart item to show</p>
            </div>

            </div>
            </div>)
        }
        else if(this.state.carts.length && this._mounted && this.state.mounted){
          const findTotal = this.state.carts.map(el => {
              return el[1] * el[4]
          })
          const total = findTotal.reduce((a,b) => {
              return a + b
          })
        return (
            <React.Fragment>
             <BreadCrump page='Shopping Cart'>
                  <Link to="/shop/all">Shop</Link>
            </BreadCrump>   
            <section className="shopping-cart spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="cart-table">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="p-name">Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th><i className="ti-close"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                
           {
               this.state.carts.map((el,indx) => {
          return     ( <tr key={el[0]}>
                    <td className="cart-pic first-row">
                        <Link to={`/shop/${el[5]}`}>
                        <img src={el[2]} alt="Cart IMG" style={{height:'170px',width:'150px'}}/></Link></td>
                    <td className="cart-title first-row">
                        <h5>{el[3]}</h5>
                    </td>
                    <td className="p-price first-row">{el[1]}&#2547;</td>
                    <td className="qua-col first-row">
                        <div className="quantity">
                            
                            <div className="pro-qty" style={{display:'block'}}>
                                <span 
                                onClick={() => {
                                    return this.dec(indx)
                                }} 
                                className='dec qtybtn'>-</span>
                                <input readOnly  type="text" value={el[4]} />
                                <span 
                                onClick={() => {
                                    return this.inc(indx)
                                }} 
                                className='inc qtybtn'>
                                    +
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className="total-price first-row">{el[1] * el[4]}&#2547;</td>
                    <td className="close-td first-row"><i onClick={() => {
                        return this.deleteCart(el[0],indx)
                    }} className="ti-close"></i></td>
                    </tr>)
               })
              

           }                         
      
                                
                             
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                       
                        <div className="col-lg-6 offset-lg-3">
                            <div className="proceed-checkout">
                                <ul>
                                    <li className="cart-total">Total 
                                    <span>
                                        {  total   }
                                     &#2547; </span>
                                   
                                    </li>
                                </ul>
                                {this.state.updated?
                                <div>
                                <p className='text-center alert alert-success mt-3'>Cart has been updated</p>
                                </div>
                                :<div className='py-5'></div>
                            }
                               
                                <button onClick={this.updateCartItems} className="btn btn-warning btn-block py-2 mb-2">UPDATE CART</button>
                                <Link to="/checkout" className="proceed-btn">PROCEED TO CHECK OUT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
            
        </React.Fragment>
        )
      }
      else{
          return (
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
