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
           product_daysale_array: [] 
        }

        this.clickDagEvent = this.clickDagEvent.bind(this);
    }

    componentDidMount(){
        
        let localStorageDB = new LocalStorageHandler();


        this.setState({
            product_array: localStorageDB.getProducts()
            
        });
    }

     //clickMonthChange()-----------------------------------------------------------------------------
     clickMonthChange = (month) => {
        console.log(`månad: ${month}`);
        this.setState({
            selectedDay: month.toLocaleDateString()

        });
        
        //clearTextFields()

    }//end of clickMonthChange()-------------------------------------------------------------

    
    //clickDagEvent() - för calender-----------------------------------------------------------------------
    async clickDagEvent(dag){
        let t_dag = dag.toLocaleDateString();
        let localStorageDB = await new LocalStorageHandler();

        console.log(`Datum ${t_dag}`)

        await this.setState({
            valtDatum: dag,
            valtDatumTextfelt: t_dag
        });

    }//end of clickDagEvent()--------------------------------------------------------------------

    onProductSelectChange = (e) => {
        //e.target.selectedIndex
        let chosen_product_id = e.target.value;
        let t_index = this.state.product_array.findIndex((obj => obj.p_id === chosen_product_id));
        let t_product = this.state.product_array[t_index];

        console.log(`click ${t_product.p_name}`);

        //console.log(`click ${e.options[e.target.selectedIndex].value}`);
        //let t = e.options[0].value;
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
