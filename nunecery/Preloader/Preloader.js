
import React, { Component } from 'react'
import './preloader.css';
import Script from './PreloaderScript';



export default class Preloader extends Component {
    componentDidMount(){
        Script();
    }
    render() {
        
        return (
            <div>
                
            </div>
        )
    }
}

