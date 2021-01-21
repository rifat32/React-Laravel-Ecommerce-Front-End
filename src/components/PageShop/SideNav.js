import React, { Component } from 'react';
import ApiClient from '../../Scripts/ApiClient/ApiClient'
import { Link } from "react-router-dom";

export default class SideNav extends Component {
    state = {
        categories: [],
        parentCat:[],
        subCategories:[],
        dropId:''
    }
    componentDidMount(){
        
       
       
        ApiClient().get('/api/categories')
        .then(response => {
           
            response.data.categories.map(el => {
                if(el.has_child === 1){
                    this.setState({
                        parentCat:[...this.state.parentCat,el.category]
                    })
                    
                }
                this.setState({
                    categories:[...this.state.categories,[el.id,el.category]]
                })
                return el
           

            })
            response.data.subCategories.map(el => {
                this.setState({
                    subCategories:[...this.state.subCategories,[el.id,el.sub_category,el.category]]
                })
                return el;
                
            })
        
         }) 
         
    }
    navDropDown = (id) =>{
       
            var x = document.getElementById(id);
            var y = document.getElementById(`d${id}`);
            if (x.className.indexOf("d-block") === -1) {
              x.className += " d-block";
              y.className += " fas fa-chevron-up";
            } else { 
              x.className = x.className.replace(" d-block", "");
              y.className = y.className.replace(" fas fa-chevron-up", "");
            }
          
    }
    render() {
        return (
            <div className="col-lg-3 "  >
                    <div className="filter-widget text-center pt-4" id="sideNav"   style={{overflowY:'scroll'}}>
                        <h4 className="fw-title text-light">Categories</h4>
                     
            <Link to='/shop/all'  className='btn btn-block text-light  my-0'> All </Link>
                               {
                                this.state.categories?


                           <ul  className="filter-catagories">
                          {
                              this.state.categories.map(el => {
                                  return (
                                      (this.state.parentCat.includes(el[1]))?
                                        <ul key={el[0]}>
                                <button
                                 onClick={() => {
                                    this.navDropDown(el[1])
                                }} 
                                className="btn btn-block text-light">{el[1]} <i id={`d${el[1]}`} className="fas fa-chevron-down"></i>
                                </button>

                                <li id={el[1]} className="d-none bg-dark ">
                                {this.state.subCategories.map(el2 => {
                               return     (el2[2] === el[1]) ?

                            <Link key={el2[0]} className='my-0 btn btn-block  text-light' to={`/shop/${el2[1]}`}>{el2[1]}</Link>
                            :
                            null

                            })}
                                 
                                </li>

                              </ul>
                                      : 
      <Link to={`/shop/${el[1]}`} key={el[0]} className='btn btn-block text-light my-0' > {el[1]} </Link>

                                   

                                  )
                                 
                              })
                          }
                       
                        
                   
                               
                            </ul>




                            :
                            null
                              
                            

                            }
                       
                    </div>
             
                </div>
        )
    }
}
