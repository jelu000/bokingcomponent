import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";
import Utskrift from './Utskrift';
import DagensKunderTable from './DagensKunderTable';
import SummeringTable from './SummeringTable';
import LocalStorageHandler from '../LocalStorageHandler';
import '../SweCalenderLang.css';

import './Dagsavslut.css';


export default class Dagsavslut extends Component {
    constructor(props){
        super(props);
        
        let today_date = new Date();

        this.state = {
             //För Kalender
            valtDatum: today_date, //Sätter färg för valt datum i calender Format: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
            selectedDay: today_date.toLocaleDateString(), //Datum i format:  2021-11-16
            locale: 'swe',
            tidtim: '8',
            tidmin: '00',
            dagsavslut: "Dagsavslut",
            //Boknings array för vald dag
            bokingsarray: []
        }

        this.clickDagEvent = this.clickDagEvent.bind(this);
        this.clickMonthChange = this.clickMonthChange.bind(this);

        //console.log(`Dagsavslut constructor today_date: ${today_date.toLocaleDateString()}`);
    }

    /*componentDidMount -------------------------------------------------------------------------------
Initate LocalStorage
*/
    componentDidMount(){
        
        let localStorageDB = new LocalStorageHandler();
        //console.log(`Dagsavslut componentDidMount: ${ this.state.selectedDay }`);
        let t_array_bokningar = localStorageDB.getBokingsDay(this.state.selectedDay);
        
        this.setState({
        bokingsarray: t_array_bokningar
        //behandlingar: t_array_behandlingar,
        //pris: t_array_behandlingar[0].t_price
        });
        
    }//end of componentDidMount-------------------------------------------------------------------------




    //clickDagEvent() - för calender-----------------------------------------------------------------------
    async clickDagEvent(dag){
        
        
        let t_dag = dag.toLocaleDateString();
        let localStorageDB = await new LocalStorageHandler();
        let t_array_bokningar = await localStorageDB.getBokingsDay(t_dag);
 
        await this.setState({
        valtDatum: dag,
        selectedDay: t_dag,
        bokingsarray: t_array_bokningar
        
        });
        
        console.log(`Dagsavslut clickDagEvent(): ${t_dag} `)
        
        
    }//end of clickDagEvent()--------------------------------------------------------------------

     //clickMonthChange()-----------------------------------------------------------------------------
    clickMonthChange(month){
        console.log(`månad: ${month}`);
        this.setState({
            selectedDay: month.toLocaleDateString()
        });
        

    }//end of clickMonthChange()-------------------------------------------------------------
  

    render() {

        //const t_dagenskundertable = DagensKunderTable();

        return (
            <div className="MainBokingDiv">
            <h1 className="h1_header">Dagrapport {this.state.selectedDay}</h1>

            <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>

            

            { /*t_dagenskundertable*/ }
            <hr/>
            <h3>Bokningar </h3>
            <DagensKunderTable  bokingsarray_prop={ this.state.bokingsarray } />
            <h3>Summa Biträde </h3>
            <SummeringTable bokingsarray_prop={ this.state.bokingsarray } />
            <h3>Försäljning </h3>
            <a href="./utskrift" target="_blank">Utskrif format</a>
            
            </div>
        )
    }
}

