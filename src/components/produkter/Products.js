import React, { Component } from 'react';
import './Products.css';
import ProductTable from './ProductTable';


export default class Products extends Component {

    constructor(props){
        super(props);

        this.state = {
            state_id: "",
            state_name: "",
            state_size: "0",
            state_price: "",
            state_products_table: []
        }
    }

    inputTextChangeName = (ev) => {
        console.log(`Test: ${ev.target.value}`)
        this.setState({ state_name: ev.target.value });
    }
    inputTextChangeSize = (ev) => {
        if (!isNaN(ev.target.value)){
            this.setState({ state_size: ev.target.value });
        }
        else{
            alert("Endast siffror är tillåtna");
        }
    }
    inputTextChangePrice = (ev) => {
        if (!isNaN(ev.target.value)){
            this.setState({ state_price: ev.target.value });
        }
        else{
            alert("Endast siffror är tillåtna");
        }
    }

    render() {
        return (
            <div className="MainBokingDiv">
                <h1 className="h1_header">Produkter</h1>
                <div>
                    Namn: <input type="text" className="long_textfelt" id="p_name" value={this.state_name} onChange={this.inputTextChangeName} />
                    <br />
                    Volym: <input type="text" className="short_textfelt" id="p_size" value={this.state_size} maxLength="6" onChange={this.inputTextChangeSize} />
                    <br />
                    Pris: <input type="text" className="short_textfelt" id="p_price" value={this.state_price} maxLength="6" onChange={this.inputTextChangePrice} />
                    <br />
                    <input id="p_savebutton" className="p_button" type="button" value="Spara" />
                    Id: <input type="text" className="short_textfelt" id="p_id"  readOnly />

                </div>

                <hr />
                <ProductTable />

            </div>
        )
    }
}

