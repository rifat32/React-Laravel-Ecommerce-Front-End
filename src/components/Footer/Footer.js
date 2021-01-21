import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom'

function Footer(props) {
    const {email,phone,address,facebook,twitter,instagram,linkedin} = props.infos;
    return (
        <footer className="footer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-lg-4">
                    <div className="footer-left">
                        <div className="footer-logo">
                            <Link to="/"><img src="./img/logo.png" alt="Footer Logo"/></Link>
                        </div>
                        {email?
                         <ul>
                         <li>{address}</li>
                         <li>{phone}</li>
                         <li>Email: {email}</li>
                        
                     </ul>
                     :
                     null}
                       
                        <div className="footer-social">
                            {facebook?<a rel='noopener noreferrer' target='_blank' href={facebook}><i className="fa fa-facebook"></i></a>:null}
                            {twitter?<a rel='noopener noreferrer' target='_blank' href={twitter}><i className="fa fa-twitter"></i></a>:null}
                            {instagram?<a rel='noopener noreferrer' target='_blank' href={instagram}><i className="fa fa-instagram"></i></a>:null}
                            {linkedin?<a rel='noopener noreferrer' target='_blank' href={linkedin}><i className="fa fa-linkedin"></i></a>:null}
                          
                            
                        </div>
                    </div>
                </div>
             
              
               
            </div>
        </div>
        <div className="copyright-reserved">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright-text">
                         
                        </div>
                        <div className="payment-pic">
                            <img src="img/payment-method.png" alt="Footer IMG"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer;
