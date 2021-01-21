import React, { Component } from 'react';
import BreadCrump from '../BreadCrump/BreadCrump';
import './faq.css';
import ApiClient from '../../Scripts/ApiClient/ApiClient';

export default class Faq extends Component {
    state = {
        faqs:[]
    }
    componentDidMount(){
        this.props.footer();
        ApiClient().get('api/faqs')
        .then(response => {
            response.data.faqs.map(el => {
                this.setState({
                    faqs:[...this.state.faqs,[el.id,el.title,el.description]]
                })
                return el;
            })
            
        })
    }
    render() {
        return (
            <React.Fragment>
                 <BreadCrump page='Faq'/>  
                 <div className="faq-section spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="faq-accordin">
                        <div className="accordion" id="faqs">
                            {
                                this.state.faqs.map(el => {

                                    return (
                                        <div key={el[0]} className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target={`#faq${el[0]}`}>
                                                {el[1]}
                                            </a>
                                        </div>
                                        <div id={`faq${el[0]}`} className="collapse" data-parent="#faqs">
                                            <div className="card-body">
                                                <p>{el[2]}</p>
                                            </div>
                                        </div>
                                    </div>  
                                    )
                                })
                            }
               
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
