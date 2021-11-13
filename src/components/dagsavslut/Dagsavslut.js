import React, { Component } from 'react'

import './Dagsavslut.css';


export default class Dagsavslut extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            dagsavslut: "Dagsavslut"
        }
    }

    render() {
        return (
            <div>
                <h3>{this.state.dagsavslut}</h3>
            </div>
        )
    }
}

