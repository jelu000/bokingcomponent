import React, { Component } from 'react';
import './Products.css';
import ProductTable from './ProductTable';
import Product from './Product';
import LocalStorageHandler from '../LocalStorageHandler';


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

    /*componentDidMount -------------------------------------------------------------------------------
Initate LocalStorage
*/
  componentDidMount(){  
    //console.log(`valtDatumTextfelt didMount: ${this.state.valtDatumTextfelt}`);
  
    let localStorageDB = new LocalStorageHandler();
    //let t_array_behandlingar = localStorageDB.getTreatments();
    this.setState({
        state_products_table: localStorageDB.getProducts()
    });
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
        document.getElementById("p_id").value="";
    }

    saveButtonClick(){
        
        let localstorage_handler = new LocalStorageHandler();
        let product_table_array = [];

        
        if (document.getElementById("p_name").value !== ""){
            if (this.state.state_id ===""){
                let t_product = new Product(this.state.state_id, this.state.state_name, this.state.state_size, this.state.state_price);
                //let t_array = this.state.state_products_table;
                //t_array.push(t_product);
                product_table_array = localstorage_handler.addProdukt(t_product);
            }
            else{
                product_table_array = localstorage_handler.updateProduct(this.state.state_id, this.state.state_name, this.state.state_size, this.state.state_price);
            }

            
            this.setState({
                //state_products_table: t_array
                state_products_table: product_table_array
            });

            this.clearFields();
        }
        else{
            alert("Namn kan inte vara tomt!")
        }
    }

    delButtonClick = (ev) =>  { //ändrade till arrowFunction & fick Bort! -TypeError: this is undefined
        const t_id = document.getElementById("p_id").value;
        
       


        if (t_id !== ""){
            try{
                let localstorage = new LocalStorageHandler();
                let t_prod_table = localstorage.deleteProduct(t_id);
                
                this.setState({
                    //state_products_table: t_array
                    state_products_table: t_prod_table
                });
                
                this.clearFields();
            }
            catch (e){
                alert(`delButt click: ${e}`);
            }
        }
        else
            alert("Id är tomt!");
    }
    clearButtonClick = (ev) => {
        this.clearFields();
    }

    productTableButtClick = (ev) =>{
        
        //console.log(`product= ${ ev.target.id }`);

        let p_id = ev.target.id;
        let products_array = this.state.state_products_table;
        
        const searchproduct= products_array.find((prod) => prod.p_id===p_id);//FEL---------------------==
        
        this.setState({
            state_id: p_id,
            state_name: searchproduct.p_name,
            state_size: searchproduct.p_size,
            state_price: searchproduct.p_price,
            
        })
        

        document.getElementById("p_name").value = searchproduct.p_name;
        document.getElementById("p_size").value = searchproduct.p_size;
        document.getElementById("p_price").value = searchproduct.p_price;
        document.getElementById("p_id").value = searchproduct.p_id;

        //console.log(`searchproduct= ${ searchproduct.p_name }`);

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
                    <input id="p_delbutton" className="p_button" type="button" value="Tabort" onClick={this.delButtonClick} />
                    <input id="p_clearbutton" className="p_button" type="button" value="Töm textfält" onClick={this.clearButtonClick} />
                    <br />
                    Id: <input type="text" className="short_textfelt" id="p_id"  readOnly />

                </div>

                <hr />
                <ProductTable productTableButtClick={this.productTableButtClick} product_array={this.state.state_products_table}/>

            </div>
        )
    }
}

