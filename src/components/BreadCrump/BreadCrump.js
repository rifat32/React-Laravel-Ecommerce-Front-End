import React, { Component } from 'react';
import './breadcrump.css'
import { Link } from "react-router-dom";

export default class BreadCrump extends Component {
   
    shouldComponentUpdate(nextProps) {
        return (this.props.page !== nextProps.page);
    }
    render() {
        return (
        <div className="breacrumb-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-text">
                            <Link to="/shop/all"><i className="fa fa-home"></i> Home</Link>
                            {this.props.children}
                            <span>{this.props.page}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
