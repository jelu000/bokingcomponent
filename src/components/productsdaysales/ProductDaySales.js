import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";
import LocalStorageHandler from '../LocalStorageHandler';
import './ProductDaySales.css'



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
           tidmin: '00'
        }

        this.clickDagEvent = this.clickDagEvent.bind(this);
    }

    componentDidMount(){
        
        let localStorageDB = new LocalStorageHandler();
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

    render() {
        return (
            <div className="MainBokingDiv" >
                <h1 className="h1_header">Produktförsäljning</h1>

                <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>
                Datum: <input type="date" id="valt_datum" value={this.state.valtDatumTextfelt} readOnly/>
               
                <hr/>
                <h3>Lägg till såld produkt</h3>
                

                
                
            </div>
        )
    }
}
