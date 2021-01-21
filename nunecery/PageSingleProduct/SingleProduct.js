import React, { Component } from 'react';
import Script from './SingleProductScript';
import './reusableProduct.css';
import IncScript from '../../Scripts/IncScript/incScript';




export default class Shop extends Component {
    componentDidMount(){
        Script();
        IncScript();
         this.props.footer(false);
          console.log(this.props.id)
    }
   
    render() {
        
        const style = {
            width:'100px',cursor:'pointer'
           }
           
        return (
            <React.Fragment>
     
                    <div className="row">
                        <div className="col-lg-6">
                            
<div className="single product-pic-zoom">
  <img src="img/product-single/product-2.jpg" alt=""/>
  <img src="img/product-single/product-2.jpg" alt=""/>
  <img src="img/product-single/product-2.jpg" alt=""/>
</div> 
<div className='text-center  d-none' >
      <div id='customize-controls' >
      <button className='btn btn-primary btn-small'>Prev</button>
      <button className='btn btn-primary btn-small'>Next</button>   
      </div>
</div>   
<div id='customize-thumbnails' className='text-center mb-2'>
       <img  style={style} src='img/product-single/product-2.jpg' className="img-fluid"  alt="Portfolio"/>
          <img style={style} src='img/product-single/product-2.jpg'  className="img-fluid "  alt="Portfolio"/>
          <img style={style} src='img/product-single/product-2.jpg'  className="img-fluid" alt="Portfolio"/>
      </div>
      <div className='text-center'>
      <button className='btn btn-primary btn-small' id='customize-toggle'> </button>
      </div>
   
                
                                 
                        </div>
                        <div className="col-lg-6">
                            <div className="product-details">
                                <div className="pd-title">
                                    <span>f</span>
                                    <h3>Pure Pineapple</h3>
                                    <a href="#" className="heart-icon"><i className="icon_heart_alt"></i></a>
                                </div>
                                <div className="pd-rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                    <span>(5)</span>
                                </div>
                                <div className="pd-desc">
                                    <p>Lorem ipsum dolor sit amet, consectetur ing elit, sed do eiusmod tempor sum dolor
                                        sit amet, consectetur adipisicing elit, sed do mod tempor</p>
                                    <h4>$495.00 <span>629.99</span></h4>
                                </div>
                                <div className="pd-color">
                                    <h6>Color</h6>
                                    <div className="pd-color-choose">
                                        <div className="cc-item">
                                            <input type="radio" id="cc-black"/>
                                            <label htmlFor="cc-black"></label>
                                        </div>
                                        <div className="cc-item">
                                            <input type="radio" id="cc-yellow"/>
                                            <label htmlFor="cc-yellow" className="cc-yellow"></label>
                                        </div>
                                        <div className="cc-item">
                                            <input type="radio" id="cc-violet"/>
                                            <label htmlFor="cc-violet" className="cc-violet"></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pd-size-choose">
                                    <div className="sc-item">
                                        <input type="radio" id="sm-size"/>
                                        <label htmlFor="sm-size">s</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" id="md-size"/>
                                        <label htmlFor="md-size">m</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" id="lg-size"/>
                                        <label htmlFor="lg-size">l</label>
                                    </div>
                                    <div className="sc-item">
                                        <input type="radio" id="xl-size"/>
                                        <label htmlFor="xl-size">xs</label>
                                    </div>
                                </div>
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <input readOnly type="text" value="1"/>
                                    </div>
                                    <a href="#" className="primary-btn pd-cart">Add To Cart</a>
                                </div>
                                <ul className="pd-tags">
                                    <li><span>CATEGORIES</span>: More Accessories, Wallets & Cases</li>
                                    <li><span>TAGS</span>: Clothing, T-shirt, Woman</li>
                                </ul>
                                <div className="pd-share">
                                    <div className="p-code">Sku : 00012</div>
                                    <div className="pd-social">
                                        <a href="#"><i className="ti-facebook"></i></a>
                                        <a href="#"><i className="ti-twitter-alt"></i></a>
                                        <a href="#"><i className="ti-linkedin"></i></a>
                                    </div>
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
                                <li>
                                    <a data-toggle="tab" href="#tab-3" role="tab">Customer Reviews (02)</a>
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
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                                <h5>Features</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in </p>
                                            </div>
                                            <div className="col-lg-5">
                                                <img src="img/product-single/tab-desc.jpg" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-2" role="tabpanel">
                                    <div className="specification-table">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td className="p-catagory">Customer Rating</td>
                                                <td>
                                                    <div className="pd-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                        <span>(5)</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Price</td>
                                                <td>
                                                    <div className="p-price">$495.00</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Add To Cart</td>
                                                <td>
                                                    <div className="cart-add">+ add to cart</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Availability</td>
                                                <td>
                                                    <div className="p-stock">22 in stock</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Weight</td>
                                                <td>
                                                    <div className="p-weight">1,3kg</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Size</td>
                                                <td>
                                                    <div className="p-size">Xxl</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Color</td>
                                                <td><span className="cs-color"></span></td>
                                            </tr>
                                            <tr>
                                                <td className="p-catagory">Sku</td>
                                                <td>
                                                    <div className="p-code">00012</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                         
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-3" role="tabpanel">
                                    <div className="customer-review-option">
                                        <h4>2 Comments</h4>
                                        <div className="comment-option">
                                            <div className="co-item">
                                                <div className="avatar-pic">
                                                    <img src="img/product-single/avatar-1.png" alt=""/>
                                                </div>
                                                <div className="avatar-text">
                                                    <div className="at-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                    </div>
                                                    <h5>Brandon Kelley <span>27 Aug 2019</span></h5>
                                                    <div className="at-reply">Nice !</div>
                                                </div>
                                            </div>
                                            <div className="co-item">
                                                <div className="avatar-pic">
                                                    <img src="img/product-single/avatar-2.png" alt=""/>
                                                </div>
                                                <div className="avatar-text">
                                                    <div className="at-rating">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star-o"></i>
                                                    </div>
                                                    <h5>Roy Banks <span>27 Aug 2019</span></h5>
                                                    <div className="at-reply">Nice !</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="personal-rating">
                                            <h6>Your Ratind</h6>
                                            <div className="rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o"></i>
                                            </div>
                                        </div>
                                        <div className="leave-comment">
                                            <h4>Leave A Comment</h4>
                                            <form action="#" className="comment-form">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <input type="text" placeholder="Name"/>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <input type="text" placeholder="Email"/>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <textarea placeholder="Messages"></textarea>
                                                        <button type="submit" className="site-btn">Send message</button>
                                                    </div>
                                                </div>
                                            </form>
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
