import React, { Component } from 'react'
import { generatePath } from "react-router";
import { Link } from "react-router-dom";

export default class Product extends Component {
    render() {
        const imgStyle = {
height:'220px',
width:'auto'
        }
        const {id,name,category,image_1,currentPrice,previousPrice} = this.props.productInfo
        const link =  generatePath("/shop/:id", {
            id: id,
          });
        return (
            <div className="col-lg-4 col-sm-6">
            <div className="product-item">
                <div className="pi-pic">
                    <img src={image_1} style={imgStyle} alt="Product IMG"/>
                    <ul>
                       
                        <li className="quick-view"><Link to={link}>+ Quick View</Link></li>
                        
                    </ul>
                </div>
                <div className="pi-text">
                    <div className="catagory-name" style={{color:'#262520',fontSize:'0.7rem'}}>{category}</div>
                    <Link to={link}>
                        <h5 style={{color:'#050504',fontSize:'1.2rem'}}>{name}</h5>
                    </Link>
                    <div className="product-price" style={{fontSize:'1.4rem'}}>
                        {currentPrice}&#2547;
                        <span className="ml-2" style={{fontSize:'1.1rem'}}  >{previousPrice} &#2547;</span>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
