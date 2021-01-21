import React, { Component } from 'react';
import Script from './SingleProductScript';
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";



export default class Shop extends Component {
    state = {
        userName:'',
        id:this.props.id,
        product:'',
        count:1,
        inCart:false
    }
    componentDidMount(){
       
        
         this.props.footer(false);
         const userName = window.localStorage.getItem('userName')
             if(userName){
                 this.setState({
                    userName: userName 
                 })
                ApiClient().post('/api/product',{
                    id:this.state.id,
                })
                .then((response) => {
                    this.setState({
               product:response.data.product[0]
                    })
                    if(response.data.product[0] === undefined){
                        window.location.href = '/shop/all'
                    }
                    this.setState({
                        inCart:response.data.inCart
                    })
                    Script();
                })
             }
             else{
                ApiClient().post('/api/product/unAuth',{
                    id:this.state.id,
                })
                .then((response) => {
                    this.setState({
               product:response.data.product[0]
                    })
                    if(response.data.product[0] === undefined){
                        window.location.href = '/shop/all'
                    }
                    Script();
                })
             }
           
         
       
    }
    
    // cart input functions
    inc = () => {
       
                this.setState({
                    count:this.state.count + 1
                })
    }
     dec = () => {
            if(this.state.count > 1){
                this.setState({
                    count:this.state.count - 1
                })
            }
    }
 
    // cart submit
    addToCart = () => {
       
            ApiClient().post('/api/cart/create',
       {
        productQuantity:this.state.count,
        productId:this.state.product.id,
       })
        .then(response => {
          this.setState({
              inCart:true
          })
         }) 
      
       
    }
    render() {
       
        const style = {
            width:'90px',cursor:'pointer',height:'90px'
           }
        let colors,sizes;
       if(this.state.product)    {
           if(this.state.product.colors){
            colors = this.state.product.colors.split(' ')
           }
       }
       if(this.state.product){
        if(this.state.product.sizes)    {
            sizes = this.state.product.sizes.split(' ')
            }
       }
       if(this.state.product.id){
           return (
            <React.Fragment>
     
            <div className="row">
                

<div className="col-lg-6">
<div className="single product-pic-zoom">
<img src={this.state.product.image_1} alt=""/>
<img src={this.state.product.image_2} alt=""/>
<img src={this.state.product.image_3} alt=""/>
</div> 
<div className='text-center  d-none' >
<div id='customize-controls' >
<button className='btn btn-primary btn-small'>Prev</button>
<button className='btn btn-primary btn-small'>Next</button>   
</div>
</div>  
<div id='customize-thumbnails' className='text-center mb-2'>
<img  style={style} src={this.state.product.image_1} className="img-fluid"  alt="Portfolio"/>
  <img style={style} src={this.state.product.image_2}  className="img-fluid "  alt="Portfolio"/>
  <img style={style} src={this.state.product.image_3}  className="img-fluid" alt="Portfolio"/>
</div>
<div className='text-center d-none'>
<button className='btn btn-primary btn-small' id='customize-toggle'> </button>
</div> 
</div>

                


                <div className="col-lg-6">
                    <div className="product-details">
                        <div className="pd-title">
                            <span>{this.state.product.category}</span>
                            <h3>{this.state.product.name}</h3>
                           
                        </div>
                       
                        <div className="pd-desc">
                            <p>{this.state.product.descriptionIntroduction}</p>
                            <h4>{this.state.product.currentPrice}&#2547; <span>{this.state.product.previousPrice}&#2547;</span></h4>
                        </div>
                       
                          
                               
                              
                                {(this.state.product.colors? 
                                 <div className="pd-color">
                                 <h6>Color</h6>       
                                         <div className="pd-color-choose">    
                                                {
                                                colors.map((el,indx) => {
                                                   
                                               return     <div 
                                               key={indx}
                                               className="cc-item">    <input type="radio" id="cc-black"/>
                                                    <label htmlFor={`cc${el}`}style={{background:`#${el}`}}></label>
                                                </div>
                                                  
                                                })
                                            }
                                       
                                            </div>
                                            </div>
                                    :null)}
                            
                    

                        {(this.state.product.sizes?        
                                       <div className="pd-size-choose">   
                                                {
                                                sizes.map((el,indx) => {
                                                   
                                               return   (<div 
                                               key={indx}
                                               className="sc-item">
                                               <input  type="radio" id={el}/>
                                               <label htmlFor={el}>{el}</label>
                                           </div>)
                                                  
                                                })
                                            }
                                       
                                            </div>
                                    :null)}
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@ Add to Cart @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  */}
                        <div className="quantity">
                            <div className="pro-qty" style={{display:'block'}}>
                                <span onClick={this.dec} className='dec qtybtn'>-</span>
                                <input  type="text" value={this.state.count} readOnly/>
                                <span onClick={this.inc} className='inc qtybtn'>+</span>
                            </div> 
                        </div>
                        <div className='d-block'>
                            {this.state.inCart?
                               <Link to='/shopping-cart'  className="btn btn-primary btn-block ">Added To Cart</Link>
                             :
                             (this.state.userName)?
                             <button onClick={this.addToCart} className="btn btn-warning btn-block ">Add To Cart</button>
                             :
                             <Link to='/login' className="btn btn-warning btn-block ">Add To Cart</Link>

                            }
                           {
                               this.state.userName?
                               <Link to={`/order-now-auth/${this.state.id}/${this.state.count}`} className="btn btn-warning btn-block ">Order Now</Link>:
                               <Link to={`/order-now-unauth/${this.state.id}/${this.state.count}`} className="btn btn-warning btn-block ">Order Now</Link>


                           }
                         
                            </div>
                       
                       
                    </div>
                </div>
            </div>
            <div className="product-tab">
                <div className="tab-item">
                    <ul className="nav" role="tablist">
                        <li>
                            <a className="active" data-toggle="tab" href="#tab-1" role="tab">DESCRIPTION</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#tab-2" role="tab">SPECIFICATIONS</a>
                        </li>
                       
                    </ul>
                </div>
                <div className="tab-item-content">
                    <div className="tab-content">
                        <div className="tab-pane fade-in active" id="tab-1" role="tabpanel">
                            <div className="product-content">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5>Introduction</h5>
                                        <p>{this.state.product.descriptionIntroduction} </p>
                                        <h5>Features</h5>
                                        <p>{this.state.product.descriptionFeatures} </p>
                                    </div>
                                    <div className="col-lg-5">
                                        <img style={{height:'350px'}} src={this.state.product.image_1}alt="Product"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-2" role="tabpanel">
                            <div className="specification-table">
                                <table>
                                    <tbody>
                                  
                                    <tr>
                                        <td className="p-catagory">Price</td>
                                        <td>
                                            <div className="p-price">{this.state.product.currentPrice}&#2547;</div>
                                        </td>
                                    </tr>
                                    {(this.state.product.stock?<tr>
                                        <td className="p-catagory">Availability</td>
                                        <td>
                                            <div className="p-stock">{this.state.product.stock} in stock</div>
                                        </td>
                                    </tr>:null)}
                                    
                                    {(this.state.product.sizes? <tr>
                                        <td className="p-catagory">Sizes</td>
                                        <td>
                                            <div className="p-size">{this.state.product.sizes}</div>
                                        </td>
                                    </tr>:null)}
                                   
                                    {(this.state.product.colors? <tr>
                                        <td className="p-catagory">Color</td>
                                        <td>
                                            {
                                                colors.map((el,indx) => {
                                                    return       <span 
                                                    key={indx} className="cs-color mr-1" style={{background:`#${el}`}}></span>
                                                   
                                                  
                                                })
                                            }
                                          
                                            </td>
                                        
                                    </tr>:null)}
                                    
                                 
                                    </tbody>
                                 
                                </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
    
</React.Fragment> 
        
           )
       }
      
     
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
