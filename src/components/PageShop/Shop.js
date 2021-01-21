import React, { Component } from 'react';
import ReusableScript from './reusableProduct';
import './reusableProduct.css';
import SideNav from './SideNav';
import ProductDetails from './SingleProduct';
import Products from './Products';




export default class Shop extends Component {
    state = {
        front:false,
        id:this.props.match.params.id
    }
    componentDidMount(){
        ReusableScript();
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        this.setState({
          id: nextProps.match.params.id
  
        })
      }
    }
    

    render() {
      const num = isNaN(this.state.id)
        return (
           <React.Fragment>
             
                
             <section className="product-shop spad page-details">
        <div className="container">
            <div className="row">
                <SideNav/>
                <div className="col-lg-9 order-1 order-lg-2 mt-2">

               
         
         {
           num 
           ?<Products searched={this.props.searched} category={this.state.id}  footer={this.props.footer}/>
           :
           <ProductDetails  footer={this.props.footer} id={this.state.id}/>
         }
  
  
               
              
                   
                </div>
            </div>
        </div>
    </section>
           </React.Fragment>
        )
    }
}
