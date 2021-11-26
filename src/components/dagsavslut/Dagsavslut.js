import React, { Component } from 'react'
import 'react-day-picker/lib/style.css';
import SweCalenderLang from "../SweCalenderLang";

import DagensKunderTable from './DagensKunderTable';
import SummeringTable from './SummeringTable';
import ProductsSailsTable from './ProductsSailsTable';
import VerifikationTable from './VerifikationTable';
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
            bokingsarray: [],
            tot_int_arbete: 0,
            tot_int_babs: 0,
            //För summeringstabell skicka SummeringTable component
            summa_table_array: [],
            summa_lastrow_obj: {assistent: "", sammanlagt_pris: 0, sammanlagt_babs: 0, sammanlagt_kontant: 0},
            //unika namn för assistent och vald dag
            uppdelad_namn_array: [],
            //för ProductsSailsTable
            sails_array: [], //försäljning av produkter för en dag
            summadaysails: {totalt: 0, kassa: 0, swish: 0 } //object med Total, Swish och kassa försäljning 
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
        
        //skapar array med unika namnnför assistenter
        //let assistents_name_array = t_array_bokningar.map( (bokingobj) => {return bokingobj.t_assistent}  );
        //let t_unique_assisarray = [...new Set(assistents_name_array)];
        let t_uniq_assisarray = this.skapaArrayUnikaNamnAssitenter(t_array_bokningar); 

        let t_summa_table_array = this.createSummaTableArray(t_uniq_assisarray, t_array_bokningar);
        //skapar sista summerings rad som object
        let t_summa_row_object = this.createLastSummaRow(t_summa_table_array);
        //lägger  till sista raden med summering av intäkter för alla biträden
        t_summa_table_array.push(t_summa_row_object);

        //hämtar försäljning
        let t_sails = localStorageDB.getSailsDay(this.state.selectedDay);
        let t_summa_product_sail = this.convertSailTableArray(t_sails);

        this.setState({
        bokingsarray: t_array_bokningar,
        uppdelad_namn_array: t_uniq_assisarray,
        summa_table_array: t_summa_table_array,
        summa_lastrow_obj: t_summa_row_object,
        sails_array: t_sails,
        summadaysails: t_summa_product_sail
        //pris: t_array_behandlingar[0].t_price
        });
        
    }//end of componentDidMount-------------------------------------------------------------------------

    //skapaArrayUnikaNamnAssitenter(t_array)-----------------------------------------------
    //IN: Vald dag med bokningar som array
    //OUT: array me endast inika namn på assistenter för vald dag
    skapaArrayUnikaNamnAssitenter(t_array){
        let assistents_name_array = t_array.map( (bokingobj) => {return bokingobj.t_assistent}  );
        let t_unique_assisarray = [...new Set(assistents_name_array)];

        return t_unique_assisarray
    }//end of skapaArrayUnikaNamnAssitenter-------------------------------------------------

    convertSailTableArray(t_array){

        let t_babs = 0;
        let t_kassa = 0;
        let t_totalt = 0;

        t_array.forEach( (obj) => {
        
            if (obj.swish)
                t_babs += parseInt(obj.pris);
            else
                t_kassa += parseInt(obj.pris);
        });
        t_totalt = t_babs + t_kassa;
        return {totalt: t_totalt, kassa: t_kassa, swish: t_babs };
    }

    //clickDagEvent() - för calender-----------------------------------------------------------------------
    async clickDagEvent(dag){
        
        
        let t_dag = dag.toLocaleDateString();
        let localStorageDB = await new LocalStorageHandler();
        let t_array_bokningar = await localStorageDB.getBokingsDay(t_dag);
        
        //let assistents_name_array = t_array_bokningar.map( (bokingobj) => {return bokingobj.t_assistent}  );
        //let t_unique_assisarray = [...new Set(assistents_name_array)];
        let t_uniq_assisarray = this.skapaArrayUnikaNamnAssitenter(t_array_bokningar);
        
        let t_summa_table_array = this.createSummaTableArray(t_uniq_assisarray, t_array_bokningar);
        //skapar sista summerings rad som object
        let t_summa_row_object = this.createLastSummaRow(t_summa_table_array);
        //lägger  till sista raden med summering av intäkter för alla biträden
        t_summa_table_array.push(t_summa_row_object);

        //för försäljning av produkter
        let t_sails = localStorageDB.getSailsDay(t_dag);
        let t_summa_product_sail = this.convertSailTableArray(t_sails);

        await this.setState({
        valtDatum: dag,
        selectedDay: t_dag,
        bokingsarray: t_array_bokningar,
        uppdelad_namn_array: t_uniq_assisarray,
        summa_table_array: t_summa_table_array,
        summa_lastrow_obj: t_summa_row_object,
        sails_array: t_sails,
        summadaysails: t_summa_product_sail
        
        });
        
        //console.log(`Dagsavslut clickDagEvent(): ${t_dag} `)
        //console.log(`state.summa_table_array ${ JSON.stringify(this.state.summa_table_array)}`);
        
        
    }//end of clickDagEvent()--------------------------------------------------------------------

     //clickMonthChange()-----------------------------------------------------------------------------
    clickMonthChange(month){
        console.log(`månad: ${month}`);
        this.setState({
            selectedDay: month.toLocaleDateString()
        });
        

    }//end of clickMonthChange()-------------------------------------------------------------

    //createSummaTableArray----------------------------------------------------------
    createSummaTableArray(uniquenames, bokkningsarray){

        let t_uppdelad_namn_array = [];

        //forEach()To greate array for unic Assistent-------------------------------------------------------------------------
        uniquenames.forEach( (t_name, i) => {
            //console.log(`for: ${i}  : ${t_name}`);
        
                
            let sammanlagt_pris = 0;
            let sammanlagt_babs = 0;
            let sammanlagt_kontant = 0;
            //let sammandragarray = [];
                        
            let t_object= {};

            bokkningsarray.forEach( (bok_obj, i) => {

                
            if (bok_obj.t_assistent === t_name){

                sammanlagt_pris = sammanlagt_pris + parseInt(bok_obj.t_price);

                if (bok_obj.t_babs) {
                    sammanlagt_babs = sammanlagt_babs + parseInt(bok_obj.t_price);
                }
                else {
                    sammanlagt_kontant = sammanlagt_kontant + parseInt(bok_obj.t_price);
                }

                t_object = {
                    assistent: t_name,
                    sammanlagt_pris: sammanlagt_pris,
                    sammanlagt_babs: sammanlagt_babs,
                    sammanlagt_kontant: sammanlagt_kontant
                }                    
                    //console.log(`forEach name: ${t_name}`)
            }//en of outer if
        
        });//End of inner forEach()

            //sammandragarray.push(t_object);DE HÄR LA BARA EN ARRAY I ARRAYEN ISTÄLLET FÖR ETT ASSISTENTOBJECT
            //uppdelad_namn_array.push(sammandragarray);

            t_uppdelad_namn_array.push(t_object);

        });//End of outer forEach();------------------------------------------------------------------------------------

        
        //let t_rowobject = this.createLastSummaRow(t_uppdelad_namn_array)
        //t_uppdelad_namn_array.push(t_rowobject);
        //console.log(`createSummaTableArray: ${ JSON.stringify(t_uppdelad_namn_array)} length: ${t_uppdelad_namn_array.length} `);
        
        return t_uppdelad_namn_array;
    }
    // end of createSummaTableArray.....................................................

    //createLastSummaRow() Skapar sista raden i summerings tabellen för assistenter där allas intäkter summeras------------------------------------------------
    //IN: array med tablerow intäkt för varje assistent
    //OUT: rad Objekt med sista raden där alla assistenter intäkter summeras
    createLastSummaRow(uppdelad_namn_array){
    
        let kassa = 0, babs = 0, totalt = 0;

        uppdelad_namn_array.forEach( (rowobject, i) => {
            
            
            totalt += rowobject.sammanlagt_pris;
            kassa +=  rowobject.sammanlagt_kontant;
            babs += rowobject.sammanlagt_babs;

       
        });
        //console.log(`createRow`);
        let t_object = {
            assistent: "SUMMA",
            sammanlagt_pris: totalt,
            sammanlagt_babs: babs,
            sammanlagt_kontant: kassa
        }
       
        
        return t_object;
    }//end of createLastSummaRow() ------------------------------------------------------------
    
    
    //setStateIntakter ANVÄNDS EJ----------------------
    printOut = () => {
        window.print();
    }
    //end of setStateIntakter-----------------------------------------
    render() {

        //const t_dagenskundertable = DagensKunderTable();
        //<ProductsSailsTable productssailstable={this.convertSailTableArray(this.state.sails_array)} />
        return (
            <div className="MainBokingDiv">
            <h1 className="h1_header">Dagrapport {this.state.selectedDay}</h1>

            <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>

            

            { /*t_dagenskundertable*/ }
            <hr/>
                <div className="utskriftformat" id="utskriftformat">
                    <h3>Dagrapport och Bokningar {this.state.selectedDay} </h3>
                    <DagensKunderTable  bokingsarray_prop={ this.state.bokingsarray } />
                    <h3>Summa Biträde </h3>
                    <SummeringTable summabokingtable={this.state.summa_table_array} />
                    <h3>Försäljning </h3>
                    <ProductsSailsTable productssailstable={this.state.summadaysails} />
                    <h3>Bokföring </h3>
                    <p>
                        Arbete: {this.state.summa_lastrow_obj.sammanlagt_pris}kr, 
                        Försäljning: {this.state.summadaysails.totalt}kr,
                        Swish: {this.state.summa_lastrow_obj.sammanlagt_babs + this.state.summadaysails.swish}kr, 
                        Kassa: {this.state.summa_lastrow_obj.sammanlagt_kontant + this.state.summadaysails.kassa}kr, 
                        Summa intäkter: {this.state.summa_lastrow_obj.sammanlagt_pris + this.state.summadaysails.totalt}kr

                    </p>
                    <VerifikationTable summadaysails={this.state.summadaysails} summa_lastrow_obj={this.state.summa_lastrow_obj} />

                    
                </div>
                <button className="printbutton" onClick={this.printOut}>Skriv ut</button>
            </div>
        )
    }
}

