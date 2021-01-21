import React, { Component } from 'react';
import BreadCrump from '../BreadCrump/BreadCrump';
import '../PageShoppingCart/reusableshoppingcart.css';
import { Link } from "react-router-dom";
import ApiClient from '../../Scripts/ApiClient/ApiClient'
import ClipLoader from "react-spinners/ClipLoader";



export default class ShoppingCart extends Component {
    state = {
        carts:[],
        noCarts:false,
    }
    componentDidMount(){
       
        this.props.footer();
        ApiClient().get('api/active-orders')
        .then(response => {
            
            if(!response.data.length){
                this.setState({
                    noCarts:true
                })
            }
            else{
                response.data.map(el => {
                    this.setState({
                        carts:[...this.state.carts,[el.cartId,el.currentPrice,el.image_1,el.name,el.productQuantity,el.orderId,el.id]]
                    })
                    return el;
                })
            }

        })
    }


    render() {
       
        if(this.state.noCarts){
            return (
            <div className='container my-5'>
                 <div className='row my-5'>
                 <div className='col-12 text-center my-5'>
<p className='display-3' > You have no active order to show</p>
            </div>

            </div>
            </div>)
        }
        else if(this.state.carts.length){
          const findTotal = this.state.carts.map(el => {
              return el[1] * el[4]
          })
          const total = findTotal.reduce((a,b) => {
              return a + b
          })
        return (
            <React.Fragment>
             <BreadCrump page='Active Orders'>
                  <Link to="/shop/all">Shop</Link>
            </BreadCrump>   
            <section className="shopping-cart spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-10 offset-lg-1">
                    <div className="cart-table">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="p-name">Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Order Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                
           {
               this.state.carts.map((el) => {
          return     ( <tr key={el[0]}>
                    <td className="cart-pic first-row">
                        <Link to={`/shop/${el[6]}`}>
                        <img src={el[2]} alt="Cart IMG" style={{height:'170px',width:'150px'}}/>
                        </Link>
                        </td>
                    <td>
                        <h5>{el[3]}</h5>
                    </td>
                    <td >{el[1]}&#2547;</td>
                    <td >{el[4]}</td>
                    <td >{el[1] * el[4]}&#2547;</td>
                    <td >#{parseInt(el[5]) + 5000}</td>
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
