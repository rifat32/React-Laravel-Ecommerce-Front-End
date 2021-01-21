import React, { Component } from 'react';
import Product from './Product';
import ApiClient from '../../Scripts/ApiClient/ApiClient';
import ClipLoader from "react-spinners/ClipLoader";
export default class Products extends Component {
   state = {
            products : [],
            next_page : `/api/products/${this.props.category}`,
            loading : false,
            noMore:false,
           
        }
   _mounted = true   
        
  
    componentDidMount(){
        this._mounted = true;
        this.getProducts();
        this.props.footer(true);
        
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentWillReceiveProps(nextProps){
if(this.props.category !== nextProps.category){
    
    setTimeout(
        () => {
          this.setState({
            noMore:true,
              products:[],
              next_page: `/api/products/${nextProps.category}`,
              loading:false
          })
          this.getProducts(); 
        }, 
        100
      );
  
    
}
    }
    
    getProducts = () => {
        if(!this.state.loading && this._mounted){
       
     
            // Set loading state to true to
            // avoid multiple requests on scroll
            this.setState({
                loading : true,
            });
     
            // register scroll event
            this.registerScrollEvent();
     
            // make XHR request
            ApiClient().get(this.state.next_page)
                .then((response) => { 
                    const paginator = response.data,
                        products = paginator.data;
     
                    if(products.length){
                        // add new 
                        this.setState({
                            products : [...this.state.products , ...products],
                            next_page : paginator.next_page_url,
                            loading: false,
                        });
                    }
                    else{
                        this.setState({
                            noMore:true
                        })
                    }
                    
                    // remove scroll event if next_page_url is null
                    if(!paginator.next_page_url){
                        this.removeScrollEvent();
                    }
                });
        }
    }

registerScrollEvent(){
    window.$(window).on('scroll', function() {
        if(window.$(window).scrollTop() + window.$(window).height() === (window.$(document).height())) {
            this.getProducts();
        }
    }.bind(this));
 
}
removeScrollEvent(){
    window.$(window).off('scroll');
}
    render() {
        return (
            <div className="product-list">
            <div className="row">
                 
            {(this.state.products.length)?
                this.state.products.map((product) =>{
                    return (
                       <Product key={product.id} productInfo={product}/>
                    )
                }):
                (!this.state.products.length && !this.state.noMore)?
                <div className="loading-spinner mx-auto">
                <ClipLoader
                    color={'#292929'}
                    loading={this.state.loading}
                />
                </div>:
                (this.state.products.length  && !this.state.noMore)?
                <div className="loading-spinner mx-auto">
                <ClipLoader
                    color={'#292929'}
                    loading={this.state.loading}
                />
                </div>
               :
               <div>No result found</div>
                
            }

           
            </div>
                    </div>
                
           
        )
    }
}
