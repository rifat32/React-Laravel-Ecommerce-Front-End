import React, { Component } from 'react';
import './contact.css'
import BreadCrump from '../BreadCrump/BreadCrump';

export default class Contact extends Component {
    componentDidMount(){
        this.props.footer();
    }
    render() {
        const  {email,phone,address} = this.props.infos;
        return (
            <React.Fragment>
                 <BreadCrump page={'Contact'}/> 
                 <div className="map spad">
        <div className="container">
            <div className="map-inner">
            <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.039519695196!2d90.35854721451122!3d23.745970094863544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4409d3e6c1%3A0xe1556702c78ae66c!2z4Kas4Ka-4KaH4Kak4KeB4KayIOCmhuCmuOCmvuCmpiDgppzgpr7gpq7gp4cg4Kau4Ka44Kac4Ka_4Kam!5e0!3m2!1sbn!2sbd!4v1609493572414!5m2!1sbn!2sbd" width="600" height="610" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0" title="gMap" style={{border:0}}></iframe>
                <div className="icon">
                    <i className="fa fa-map-marker"></i>
                </div>
            </div>
        </div>
    </div>  
    <section className="contact-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="contact-title">
                        <h4>Contacts Us</h4>
                        <p>Contrary to popular belief, Lorem Ipsum is simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, maki years old.</p>
                    </div>
                    <div className="contact-widget">
                      
                    {address? <div className="cw-item">
                            <div className="ci-icon">
                                <i className="ti-location-pin"></i>
                            </div>
                            
                            <div className="ci-text">
                                <span>Address:</span>
                                <p>{address}</p>
                            </div>
                        </div>:null}
                       
                       {phone? <div className="cw-item">
                            <div className="ci-icon">
                                <i className="ti-mobile"></i>
                            </div>
                            <div className="ci-text">
                                <span>Phone:</span>
                                <p>{phone}</p>
                            </div>
                        </div>:null}
                       {email? <div className="cw-item">
                            <div className="ci-icon">
                                <i className="ti-email"></i>
                            </div>
                            <div className="ci-text">
                                <span>Email:</span>
                                <p>{email}</p>
                            </div>
                        </div>:null}
                    </div>
                </div>
         
            </div>
        </div>
    </section>
                
            </React.Fragment>
        )
    }
}
