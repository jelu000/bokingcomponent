import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";
import LocalStorageHandler from '../LocalStorageHandler';
import SelectProductSails from './SelectProductSails';
import TableProductDaySales from './TableProductDaySales';
//import ProductDaySale from './ProductDaySale';
import Product from '../produkter/Product';

import './ProductDaySales.css';



export default class ProductDaySales extends Component {

    constructor(props){
        super(props);
        
        let today_date = new Date();

        this.state = {
            //För Kalender
           valtDatum: today_date, //Sätter färg för valt datum i calender Format: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
           valtDatumTextfelt: today_date.toLocaleDateString(),
           
           selectedDay: today_date.toLocaleDateString(), //Datum i format:  2021-11-16
           locale: 'swe',
           tidtim: '8',
           tidmin: '00',
           product_array: [],
           product_daysale_array: [],
           selected_product: {},

           textinput_name: "",
           textinput_size: "",
           textinput_price: "",
           checkbox_babs: false,
           textinput_pd_id: ""

        }

        this.clickDagEvent = this.clickDagEvent.bind(this);
    }

    componentDidMount(){

        let today_date = new Date();
        
        let localStorageDB = new LocalStorageHandler();
        

        this.setState({
            valtDatum: today_date, //Sätter färg för valt datum i calender Format: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
            valtDatumTextfelt: today_date.toLocaleDateString(),
            product_array: localStorageDB.getProducts(),
            product_daysale_array: localStorageDB.getProductDaySales(today_date.toLocaleDateString()) 
        });
    }

     //clickMonthChange()-----------------------------------------------------------------------------
     clickMonthChange = (month) => {
        console.log(`månad: ${month}`);
        this.setState({
            selectedDay: month.toLocaleDateString(),
            //tömmer textfelt
            textinput_name: "",
            textinput_pd_id: "",
            textinput_price: "",
            textinput_size: "",
            checkbox_babs: Boolean

        });
        
        

    } //end of clickMonthChange()-------------------------------------------------------------

    //---------------clearTextFields()
    
    //clickDagEvent() - för calender-----------------------------------------------------------------------
    clickDagEvent(dag){
        let t_dag = dag.toLocaleDateString();
        let localStorageDB = new LocalStorageHandler();

        console.log(`Datum ${t_dag}`)

         this.setState({
            valtDatum: dag,
            valtDatumTextfelt: t_dag,
            product_daysale_array: localStorageDB.getProductDaySales(t_dag),
            //tömmer textfelt
            textinput_name: "",
            textinput_pd_id: "",
            textinput_price: "",
            textinput_size: "",
            checkbox_babs: false
        });

    } //end of clickDagEvent()--------------------------------------------------------------------

    onProductSelectChange = async (e) => {
        
        let chosen_product_id = e.target.value;
        let t_index = this.state.product_array.findIndex((obj => obj.p_id === chosen_product_id));
        let t_product = this.state.product_array[t_index];

        console.log(`click ${t_product.p_name}`);
        //let t_array = this.state.product_daysale_array;

        
        //let localStorageDB = new LocalStorageHandler();
        //let t_arraydaysales = [];
        //t_arraydaysales =  await localStorageDB.addProductDaySale(false, this.state.valtDatumTextfelt, t_product);
        
        this.setState({
            selected_product: t_product, 
            //product_daysale_array: t_arraydaysales,
            textinput_name: t_product.p_name,
            textinput_size: t_product.p_size,
            textinput_price: t_product.p_price
        
           
        });
        
        //let product_day_sale = new ProductDaySale(this.state.valtDatumTextfelt,)

        //this.setState({
            //product_daysale_array: [...this.state.product_daysale_array,]
        //});

        //console.log(`click ${e.options[e.target.selectedIndex].value}`);
        //let t = e.options[0].value;
    }

    onInputNameText = (ev) => {
        this.setState({ textinput_name: ev.target.value });
        console.log(ev.target.value);
    }
    onInputSizeText = (ev) => {
        if (isNaN(ev.target.value)){
            alert("Endast siffror tillåtna!")
        }
        else {
            this.setState({ textinput_size: ev.target.value });
        }
        console.log(ev.target.value);
    }
    onInputPriceText = (ev) => {
        if (isNaN(ev.target.value)){
            alert("Endast siffror tillåtna!")
        }
        else {
            this.setState({ textinput_price: ev.target.value });
        }
        console.log(ev.target.value);
    }
    onInputPdIdText = (ev) => {
        this.setState({ textinput_pd_id: ev.target.value });
        console.log(ev.target.value);
    }
    onInputBabsCheck = (ev) => {
        
        let t_checked = !this.state.checkbox_babs;
        this.setState({ checkbox_babs: t_checked });
        console.log(ev.target.value);
    }

     

    //-----------------------------------------------------------
    onSaveButtClick = (ev) => {

        
        //Namnet får inte vara tomt
        if (this.state.textinput_name !== "" ){
            let t_arraydaysales = [];
            //ny post
            if (this.state.textinput_pd_id === ""){
                
                let localStorageDB = new LocalStorageHandler();
               
                let t_product = new Product(this.state.selected_product.p_id, this.state.textinput_name, this.state.textinput_size, this.state.textinput_price );
                t_arraydaysales = localStorageDB.addProductDaySale(this.state.checkbox_babs, this.state.valtDatumTextfelt, t_product);
                                
            }
            //updatera post
            else{
                
                let localStorageDB = new LocalStorageHandler();
                t_arraydaysales =  localStorageDB.updateDaySaleProduct(this.state.textinput_pd_id, this.state.textinput_name, this.state.textinput_size, this.state.textinput_price, this.state.checkbox_babs)
            }

            this.setState({ 
                product_daysale_array: t_arraydaysales,
                 //tömmer textfelt
                 textinput_name: "",
                 textinput_pd_id: "",
                 textinput_price: "",
                 textinput_size: "",
                 checkbox_babs: false
            
            });

        }
        else{
            alert( "Namn och pris måste finnas!")
        }
    }

    onDelButtClick = (ev) => {
        console.log(`textinput_pd_id ${this.state.textinput_pd_id}`);
        if (this.state.textinput_pd_id !== ""){
            let localStorageDB = new LocalStorageHandler();
            let t_arraydaysales = [];
            
        
            t_arraydaysales = localStorageDB.delProductDaySale(this.state.textinput_pd_id);
            
            this.setState({ 
                product_daysale_array: t_arraydaysales,
                //tömmer textfelt
                textinput_name: "",
                textinput_pd_id: "",
                textinput_price: "",
                textinput_size: ""
            
            });
        }
        //updatera post
        else{
            alert(" Inget ID anget!")
        }
    
    }
//----------------------------------------------------------------------------------------
    onTableButtClick = async (ev) => {
        let daysale_pd_id = ev.target.value;
        //console.log(`onTableButtClick: ${daysale_pd_id}`);


        let product_daysale_object = {};
        let localStorageDB = new LocalStorageHandler();
        
        product_daysale_object = await localStorageDB.getDaySaleProduct(daysale_pd_id);

        console.log(`onTableButtClick ${product_daysale_object.pd_babs}`)

         this.setState({
            textinput_name: product_daysale_object.pd_name,
            textinput_size: product_daysale_object.pd_size,
            textinput_price: product_daysale_object.pd_price,
            checkbox_babs: product_daysale_object.pd_babs,
            textinput_pd_id: product_daysale_object.pd_id

        });

        //console.log(`onTableButtClick: ${daysale_pd_id} object: ${product_daysale_object.pd_name}`);
    
    }
    render() {

        return (
            <div className="MainBokingDiv" >
                <h1 className="h1_header">Produktförsäljning</h1>
                
                <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>
                Datum: <input type="date" id="valt_datum" value={this.state.valtDatumTextfelt} readOnly/>
                
                
                
                <hr/>
                <div className="div_inner">
                    <h3>Lägg till såld produkt</h3>
                    <SelectProductSails product_array={this.state.product_array} onProductSelectChange={this.onProductSelectChange} />

                    Namn:<input type="text" id="textinput_name" value={this.state.textinput_name} onChange={this.onInputNameText} />
                    <br />
                    Pris:<input type="text" id="textinput_price" value={this.state.textinput_price} onChange={this.onInputPriceText} />
                    
                    Volym:<input type="text" id="textinput_size" value={this.state.textinput_size} onChange={this.onInputSizeText} />
                    <br />
                    Swish:<input type="checkbox" checked={this.state.checkbox_babs}  onChange={this.onInputBabsCheck} />
                    Id:<input type="text" id="textinput_id" value={this.state.textinput_pd_id} onChange={this.onInputBabsCheck} />
                    <br />
                    <button className='b_button' onClick={this.onSaveButtClick}>Spara</button> <button className='p_button' onClick={this.onDelButtClick}>Tabort</button>

                </div>
                <hr/>

                <div className="div_inner">
                    <h3>produktförsäljning {this.state.valtDatumTextfelt}</h3>
                    <TableProductDaySales onTableButtClick={this.onTableButtClick} productarray_prop={this.state.product_daysale_array} />
                
                </div>
               
                
            </div>
        )
    }
}
