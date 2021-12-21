import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";
import LocalStorageHandler from '../LocalStorageHandler';
import SelectProductSails from './SelectProductSails';
import TableProductDaySales from './TableProductDaySales';
import ProductDaySale from './ProductDaySale';
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
            selectedDay: month.toLocaleDateString()

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
            product_daysale_array: localStorageDB.getProductDaySales(t_dag)
        });

    } //end of clickDagEvent()--------------------------------------------------------------------

    onProductSelectChange = async (e) => {
        
        let chosen_product_id = e.target.value;
        let t_index = this.state.product_array.findIndex((obj => obj.p_id === chosen_product_id));
        let t_product = this.state.product_array[t_index];

        console.log(`click ${t_product.p_name}`);
        let t_array = this.state.product_daysale_array;

        
        let localStorageDB = new LocalStorageHandler();
        let t_arraydaysales = [];
        t_arraydaysales =  await localStorageDB.addProductDaySale(false, this.state.valtDatumTextfelt, t_product);
        
        this.setState({
            selected_product: t_product, 
            product_daysale_array: t_arraydaysales
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
        this.setState({ textinput_name: ev.target.value });
        console.log(ev.target.value);
    }
    onInputPriceText = (ev) => {
        this.setState({ textinput_name: ev.target.value });
        console.log(ev.target.value);
    }
    onInputPdIdText = (ev) => {
        this.setState({ textinput_name: ev.target.value });
        console.log(ev.target.value);
    }
    onInputBabsCheck = (ev) => {
        this.setState({ textinput_name: ev.target.value });
        console.log(ev.target.value);
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
                    Swish:<input type="checkbox" value={this.state.checkbox_babs} onChange={this.onInputBabsCheck} />
                    Id:<input type="text" id="textinput_id" value={this.state.textinput_pd_id} onChange={this.onInputBabsCheck} />


                </div>
                <hr/>

                <div className="div_inner">
                    <h3>produktförsäljning {this.state.valtDatumTextfelt}</h3>
                    <TableProductDaySales productarray_prop={this.state.product_daysale_array} />
                
                </div>
               
                
            </div>
        )
    }
}
