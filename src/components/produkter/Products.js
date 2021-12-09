import React, { Component } from 'react';
import './Products.css';
import ProductTable from './ProductTable';
import Product from './Product';


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

        this.saveButtonClick = this.saveButtonClick.bind(this);
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

    clearFields(){
        document.getElementById("p_name").value="";
        document.getElementById("p_price").value="";
        document.getElementById("p_size").value="";
    }

    saveButtonClick(){
        let t_product = new Product(this.state.state_id, this.state.state_name, this.state.state_size, this.state.state_price);
        let t_array = this.state.state_products_table;
        t_array.push(t_product);

        this.setState({
            state_products_table: t_array
        });

        this.clearFields();
    }

    productTableButtClick = (ev) =>{
        
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
                    <input id="p_savebutton" className="p_button" type="button" value="Spara" onClick={this.saveButtonClick} />
                    Id: <input type="text" className="short_textfelt" id="p_id"  readOnly />

                </div>

                <hr />
                <ProductTable productTableButtClick={this.productTableButtClick} product_array={this.state.state_products_table}/>

            </div>
        )
    }
}

