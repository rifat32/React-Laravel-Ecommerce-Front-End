import React, { Component } from 'react';
import Hero from './Hero/Hero';
import HeroScript from './Hero/HeroScripts';

export default class Home extends Component {
    componentDidMount(){
        HeroScript();
      
    }
  
    render() {
        
        return (
            <React.Fragment>
                <Hero/>
            </React.Fragment>
        )
    }
}
