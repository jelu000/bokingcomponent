import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";


import './Dagsavslut.css';


export default class Dagsavslut extends Component {
    constructor(props){
        super(props);
        
        let today_date = new Date();

        this.state = {
             //För Kalender
            valtDatum: today_date, //ANVÄNDS EJ: Innehåller Datum strig från kalender ex: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
            valtDatumTextfelt: today_date.toLocaleDateString(), //Datumtextfält
            locale: 'swe',
            tidtim: '8',
            tidmin: '00',
            dagsavslut: "Dagsavslut"
        }

        this.clickDagEvent = this.clickDagEvent.bind(this);
        this.clickMonthChange = this.clickMonthChange.bind(this);
    }

    /*componentDidMount -------------------------------------------------------------------------------
Initate LocalStorage
*/
    componentDidMount(){
        
        //let localStorageDB = new LocalStorageHandler();
        //let t_array_behandlingar = localStorageDB.getTreatments();
        //this.setState({
        //state_vald_dag_arraybokningar: localStorageDB.getBokingsDay(this.state.valtDatumTextfelt),
        //behandlingar: t_array_behandlingar,
        //pris: t_array_behandlingar[0].t_price
        //});
        
    }//end of componentDidMount-------------------------------------------------------------------------

    //clickDagEvent() - för calender-----------------------------------------------------------------------
    async clickDagEvent(dag){
        let t_dag = dag.toLocaleDateString();

        //console.log(`ckicDagEvent line 112: ${t_dag}`);
        
        //let localStorageDB = await new LocalStorageHandler();
        //let dagensbokningar = await localStorageDB.getBokingsDay(t_dag);
        //console.log(`dagensbokningar: ${JSON.stringify(dagensbokningar)}`);
        
        await this.setState({
        valtDatum: dag
        //valtDatumTextfelt: t_dag,
        //state_vald_dag_arraybokningar: dagensbokningar
        });
        console.log(`Dagsavslut clickDagEvent(): ${t_dag} `)
        //this.clearTextInputs();
        
    }//end of clickDagEvent()--------------------------------------------------------------------

     //clickMonthChange()-----------------------------------------------------------------------------
    clickMonthChange(month){
        console.log(`månad: ${month}`);
        //Här ska ändras så att datum textfält stämmer när man byter månad

        this.clearTextInputs();

    }//end of clickMonthChange()-------------------------------------------------------------
  

    render() {
        return (
            <div className="MainBokingDiv">
            <h1 className="h1_header">Dagsavslut</h1>

            <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>


            </div>
        )
    }
}

