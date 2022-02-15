//npm install react-day-picker --save --legacy-peer-deps
//fick instalationfel med bara $ npm install react-day-picker --save
//https://stackoverflow.com/questions/64718633/unable-to-resolve-dependency-tree-reactjs
//http://react-day-picker.js.org/docs/getting-started
//http://react-day-picker.js.org/examples/selected-state
//package.json "homepage": "/bokingcomponent",
import React from 'react';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import './JlBokingComp.css';
import SweCalenderLang from "./SweCalenderLang";
import ChoseAssistent from "./ChoseAssistent";
import Bokning from "./Bokning";
import BokingTable from "./BokingTable";
import LocalStorageHandler from './LocalStorageHandler';


class JlBokingComp extends React.Component {

  constructor(props){
    super(props);

    //let today_date1 = new Date();
    //let today_date = today_date1.toLocaleDateString();
    let today_date = new Date();
    //today_date = today_date.toLocaleDateString();
    //console.log(today_date);

    this.state = {
      //För Kalender
      valtDatum: today_date, //Sätter färg för valt datum i calender Format: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
      valtDatumTextfelt: today_date.toLocaleDateString(), //Datumtextfält
      locale: 'swe',
      //-+++++++++++++tidtim: '8',
      //-++++++++++++++++++tidmin: '00',

      state_inputtime: '10:00',

      //För bokning - biträde
      assistents: ["Jens", "Monica"],
      state_vald_assistent: "",
      //För bokning - Behandling
      behandlingar: [],
      pris: "0",
      //För bokning - betalsätt och internetbokning
      swish: false,
      internetbokning: false,
      //För bokning - kund information
      state_kund: '', //Användst inte för då krävs onChange och rener för varje bokstav
      state_tel: '', //Användst inte för då krävs onChange och rener för varje bokstav


      state_bokningskoll: '',
      state_bokningsId: '',

      arraybokningar: [],
      state_vald_dag_arraybokningar: [],
      state_valdBokning: Bokning

    };

    //console.log(`valtDatumTextfelt: ${this.state.valtDatumTextfelt}`);

    this.clickDagEvent = this.clickDagEvent.bind(this);
    this.clickBoka = this.clickBoka.bind(this);
    this.clickMonthChange = this.clickMonthChange.bind(this);
    this.valdBokingEvt = this.valdBokingEvt.bind(this);
    this.clickAvbokaEvt = this.clickAvbokaEvt.bind(this);
  }//end of constructor()-----------------------------------------------------------------------


  /*clearTextInputs()------------------------------------------------------------------------------
    claer all textinputs after a boking
  */
  clearTextInputs(){

    document.getElementById("textfelt_namn").value = "";
    document.getElementById("textfelt_tel").value="";
    document.getElementById("selbitrade").selectedIndex=0;
    document.getElementById("id_treatment").selectedIndex=0;

    //Uppdaterar Tiden
    //-+++++document.getElementById("id_min").selectedIndex=0;
    //-+++++document.getElementById("id_timmar").selectedIndex=0;

    let t_treatment_name = document.getElementById("id_treatment").value
    let vald_treatment = this.state.behandlingar.find((t_object) => { return t_object.t_name === t_treatment_name; });
    //console.log(`pris: ${vald_treatment.t_price}`);
    
  
    this.setState({
      state_bokningsId: "",
      pris: vald_treatment.t_price,
      swish: false
      
    });

    document.getElementById("swishcheckbox").checked = this.state.swish;
  }//end clearTextInputs()------------------------------------------------------------------------

/*componentDidMount -------------------------------------------------------------------------------
Initate LocalStorage
*/
  componentDidMount(){  
  //console.log(`valtDatumTextfelt didMount: ${this.state.valtDatumTextfelt}`);

  let localStorageDB = new LocalStorageHandler();
  let t_array_behandlingar = localStorageDB.getTreatments();
  this.setState({
    state_vald_dag_arraybokningar: localStorageDB.getBokingsDay(this.state.valtDatumTextfelt),
    behandlingar: t_array_behandlingar,
    pris: t_array_behandlingar[0].t_price
  });
  
}//end of componentDidMount-------------------------------------------------------------------------


//clickDagEvent() - för calender-----------------------------------------------------------------------
  async clickDagEvent(dag){
    let t_dag = dag.toLocaleDateString();

    //console.log(`ckicDagEvent line 112: ${t_dag}`);
    
    let localStorageDB = await new LocalStorageHandler();
    let dagensbokningar = await localStorageDB.getBokingsDay(t_dag);
    //console.log(`dagensbokningar: ${JSON.stringify(dagensbokningar)}`);
    
    await this.setState({
      valtDatum: dag,
      valtDatumTextfelt: t_dag,
      state_vald_dag_arraybokningar: dagensbokningar,
      state_bokningskoll: ""
      
     });
     
     this.clearTextInputs();
     //console.log(`Kill: ${this.state.valtDatum} : ${this.state.valtDatumTextfelt}`)
    
  }//end of clickDagEvent()--------------------------------------------------------------------

  //clickMonthChange()-----------------------------------------------------------------------------
  clickMonthChange(month){
    console.log(`månad: ${month}`);
    //Här ska ändras så att datum textfält stämmer när man byter månad

    this.clearTextInputs();

  }//end of clickMonthChange()-------------------------------------------------------------
  
  //clickBoka()------------------------------------------------------------------------------------
  async clickBoka(){
    //Namn på kund måste fyllas i
    if (document.getElementById("textfelt_namn").value ===""){
      alert("Namn på kund krävs!")
    }
    else{      
      //hämtar tid och datum inputs
      //-++++++++++++++++let t_tid = this.state.tidtim + ":" + this.state.tidmin;
      let t_tid = this.state.state_inputtime;
      
      let t_datum = this.state.valtDatumTextfelt;

      //hämtar boknings info inputs
      let t_namn = document.getElementById("textfelt_namn").value;
      //let t_namn = this.state.state_kund;
      let t_tel = document.getElementById("textfelt_tel").value;
      let t_assis = document.getElementById("selbitrade").value;
      let t_behandling = document.getElementById("id_treatment").value;
      //Om det är en bokning 
      if (this.state.state_bokningsId === ""){
        
        //skapar unikt bokningsid med dagens datum och exakt tid. skulle kunna använda symbols istället
        let b_id = Date.now();
        //console.log(b_id);

        //skriver ut boknings koll text                                     -++++kl ${this.state.tidtim}:${this.state.tidmin}
        let bokningskoll_text = `${t_namn} är välkommen för ${t_behandling} kl ${this.state.state_inputtime} den ${t_datum}.  `
        //Skapar boknings objekt från boknings klass
        let bokning = new Bokning(b_id ,t_tid, t_datum, t_namn, "TheEmail",  t_tel, t_assis, t_behandling, false, this.state.swish, this.state.pris);

        //Local storage kanske för DB sen
        let localStorageDB = new LocalStorageHandler();
        let t_dagarray_bokningar = localStorageDB.addBoking(bokning);
        
        //console.log(`addBoking: ${ JSON.stringify(t_dagarray_bokningar)}`);
        
        //sätter state och uppdaterar grafiskt användar gränssnitt för de komponenter som påverkas av detta
        await this.setState({
          //uppdaterar bokningskoll med text om bokning  
          state_bokningskoll: bokningskoll_text,
          //uppdatera bokningsId text med hjälpa av set state och nya b_id
          state_bokningsId: b_id,
          //uppdaterar tabell med bokningar genom state_vald_dag_arraybokningar
          state_vald_dag_arraybokningar: t_dagarray_bokningar
        })
      }
      //Om det är en ombokning
      else{
        //skriver ut boknings koll text                                         -++++++kl ${this.state.tidtim}:${this.state.tidmin}
        let bokningskoll_text = `${t_namn} är välkommen för ${t_behandling} kl ${this.state.state_inputtime} den ${t_datum}. BokningsId: ${this.state.state_bokningsId}  `
        //Skapar boknings objekt från boknings klass
        let bokning = new Bokning(this.state.state_bokningsId ,t_tid, t_datum, t_namn, "TheEmail",  t_tel, t_assis, t_behandling, false, this.state.swish, this.state.pris);

        //console.log(`Uppdatera!!! ${this.state.state_bokningsId} namn: ${bokning.t_name}`);
        //Local storage handler för DB och kanske för DB sen
        let localStorageDB = new LocalStorageHandler();
        let t_arraydag_bokningar = localStorageDB.updateBoking(this.state.state_bokningsId, bokning);
        
        await this.setState({
          state_bokningskoll: bokningskoll_text,
          //uppdaterar tabell med bokningar genom state_vald_dag_arraybokningar
          state_vald_dag_arraybokningar: t_arraydag_bokningar       
        })

        
      }
      //Tömmer textFällt
      this.clearTextInputs();
    }
  }//end of clickBoka()----------------------------------------------------------------------------

  //clickAvbokaEvt()--------------------------------------------------------------------------------
  async clickAvbokaEvt(e){
    //console.log(`Avboka id: ${this.state.state_bokningsId}`);
    let lstore_handler = new LocalStorageHandler();
    await lstore_handler.deleteBoking(this.state.state_bokningsId);
    let t_array_dagbokningar = await lstore_handler.getBokingsDay(this.state.valtDatumTextfelt);

    await this.setState({
      state_vald_dag_arraybokningar: t_array_dagbokningar,
      state_bokningsId: ""
    });

    this.clearTextInputs();
  }//end of clickAvbokaEvt()----------------------------------------------------------------------

  //handleClickTim--------------------------------------------------------------------------------
  handleClickTim = (evt) => { this.setState({ tidtim: evt.target.value, state_bokningskoll: "" }) }
  //en of handleClickTim--------------------------------------------------------------------------
  //selectTim()--------------------------------------------------------------------------------
  selectTim(){
    let tim_array = ["8","9","10","11","12","13","14","15","16","17","18"];
    return (
      <select tabIndex="1" name="timmar" id="id_timmar" onClick={ this.handleClickTim }>
        {tim_array.map((tim, index) => (
          <option key={index+8} id={index+8}>{tim}</option>
        ))}

      </select>
    );
  }//end of handleClickTim----------------------------------------------------------------

  //handleClickMin-------------------------------------------------------------------------------
  handleClickMin = (evt) => { this.setState({ tidmin: evt.target.value, state_bokningskoll: "" }) }
  //end of handleCickMin---------------------------------------------------------------
  //selectMin()--------------------------------------------------------------------------
  selectMin(){ 
    let min_array = ["00","15","30","45"];
    return (
      <select tabIndex="2" name="min" id="id_min" onChange={ this.handleClickMin }>
        {min_array.map((min) => (
          <option key={min}>{min}</option>
        ))}

      </select>
    );
    
  }//end of selectMin()---------------------------------------------------------------

  
  //setBabsBool() set the swish state as boolean--------------------------------------
  setBabsBool = (evt) => { 
    
    let t_checked = !this.state.swish;
    this.setState({ swish: t_checked}
  
  )}
  //end of setBabsBool-----------------------------------------------------------------

   //setInternetBokingBool() set the swish state as boolean--------------------------------------
   setInternetBokingBool = (evt) => { 
    
    console.log(`setInternetBokingBool: ${ this.state.state_bokningsId}`);
    
    if (this.state.state_bokningsId !== ""){
      alert("Denna tid är redan upptagen!")
    }
    else{ 
      let t_checked = !this.state.internetbokning;
      this.setState({ internetbokning: t_checked})
    }
  }
  //end of setInternetBokingBool-----------------------------------------------------------------


  //editPrice()--------------------------------------------------------------------------
  editPrice = (e) => {

    if (!isNaN(e.target.value)){
      this.setState({
        pris: e.target.value
      });
    }
    else{
      alert("Endast siffror är tillåtna");
    }
  }//end of editPrice()-----------------------------------------------------------------

  //handleClickTreatment()---------------------------------------------------------------
  handleClickTreatment = (e) => {
    
    let vald_treatment = this.state.behandlingar.find((t_object) => { return t_object.t_name === e.target.value; });
    //console.log(`pris: ${vald_treatment.t_price}`);
    
    this.setState({ pris: vald_treatment.t_price});
  }//end of handleClickTreatment()-------------------------------------------------------
  
  //selectTreatment()-----------------------------------------------------------------------------
  selectTreatment(){

    return (
      <select tabIndex="3" tabIndex="4" name="treatment" id="id_treatment" onChange={ this.handleClickTreatment }>
        {this.state.behandlingar.map((behandling, index) => (
          <option value={behandling.t_name} key={index}>{behandling.t_name}</option>
        ))}

      </select>
    );
  }//end of selectTreatment()----------------------------------------------------------------------

  //handleAssistentClick() -callback for BokingTableButt-----------------------------------------------------
  handleAssistentClick = (evt) => {
    //console.log(`handleAssistentClick() ${evt.target.value}`);
    this.setState({
      state_vald_assistent: evt.target.value,
      state_bokningskoll: ""
    })
  }
  //end of handleAssistentClick-----------------------------------------------------------------------
  /* 
  valdBokingEvt(evt)
  In: callBack event from BokingTableButton that returns a Bokning object - used in BokingTableButton
  */
  valdBokingEvt(evt){
    
    //Kanske inte behövs för att uppdatera bokning - räcker med bokning id!
    //console.log(`valdBokingEvt t_time: ${evt.t_time}`);
    let t_boking = new Bokning(evt.t_id, evt.t_time, evt.t_date, evt.t_name, evt.t_email, evt.t_phone, evt.t_assistent, evt.t_treatment, evt.t_inetboking, evt.t_babs, evt.t_price);
    //console.log(`valdBokingEvt(evt) ${JSON.stringify(t_boking)}`);


    document.getElementById("textfelt_namn").value = evt.t_name;
    document.getElementById("textfelt_tel").value = evt.t_phone;
     
    //Dela tid i tim och min 8:00 med split:
    //-+++++++const t_tidarray = evt.t_time.split(":");
    
    //Sätter selecter för tid
    //-++++++document.getElementById("id_timmar").value=t_tidarray[0];
    //-++++++document.getElementById("id_min").value=t_tidarray[1];
    //Sätter selecten för behandling
    document.getElementById("id_treatment").value=evt.t_treatment;
    document.getElementById("selbitrade").value=evt.t_assistent;
    document.getElementById("swishcheckbox").checked=evt.t_babs;
    
    
    //används för att uppdatera vald bokning
    this.setState({
      //state_valdBokning: evt,
      state_valdBokning: t_boking, 
      state_bokningsId: evt.t_id,
      //-+++tidtim: t_tidarray[0],
      //-++++tidmin: t_tidarray[1],
      state_inputtime: evt.t_time,
      pris: t_boking.t_price,
      //för swish
      swish: evt.t_babs
    });
    //this.setState({ tidmin: evt.target.value }

}//end of valdBokingEvt(evt)----------------------------------------------------

//createBokingTables() -För bokningsTable till varje assistent----------------------------------------------------
//returns - [{"t_assistent":"STRING","table_obj":[{"OBJECT"}]}, {"t_assistent":"STRING","table_obj":[{"OBJECT"}]}]
createBokingTables(){
  let t_assistents = this.state.assistents;
  let t_this_daybokings = this.state.state_vald_dag_arraybokningar;

  //Start of map()---------------------------------------------------------------  
  //returns array of objects with assistentname(t_asssitent) and array with tabledata bokings(table_obj)
  let t_array_table = t_assistents.map( (t_assis) => {
      
      //new array
      let t_new_boking_array = [];

      for(let i=0; i<t_this_daybokings.length; i++) {
        
        //console.log(`innerloop ${i} : assis ${t_this_daybokings[i].t_assistent}`);
        if (t_assis === t_this_daybokings[i].t_assistent){
          //console.log(`${JSON.stringify(t_this_daybokings[i].t_assistent)}  = ${JSON.stringify(t_assis)} :: ${t_assis === t_this_daybokings[i].t_assistent} `);
          //console.log(`${i}: Bokingobject= ${JSON.stringify(t_bokning)} `)
          t_new_boking_array.push(t_this_daybokings[i]);
          
        }
      }//end of for loop
      
      //Create a table object, assistent name as (string)=t_key and table_obj as(Object)
      let tableobjekt = {t_assistent: t_assis, table_obj: t_new_boking_array};
      //console.log(`tableobject ${JSON.stringify(tableobjekt)}`);

      
      return tableobjekt;
      //return t_new_boking_array;   
    
    });//end of map()
     
     //console.log(`t_table = ${ JSON.stringify(t_array_table) }  LENGTH ${t_array_table.length}`);

    return t_array_table;
  }//end of createBokingTables---------------------------------------------------------------

  newInputTimeChange = (ev) => {
    this.setState({
      state_inputtime: ev.target.value
    })

    console.log(`Time: ${this.state.state_inputtime}`);
  }

  //render()-------------------------------------------------------------------------------------------------
  render () {
       
    let bokningskoll_div;

    if (this.state.state_bokningskoll !== ""){
      bokningskoll_div = <div className="innerdivs"><p id="bokningskoll">{this.state.state_bokningskoll}</p></div>
    }

    let t_bokingtable_data = this.createBokingTables();

    let t_jsx_tables = t_bokingtable_data.map( (assis_table_obj, it) => {

      return ( <div key={it}><h3>{assis_table_obj.t_assistent}</h3> <BokingTable key={assis_table_obj.t_assistent} valdBokingEvt={this.valdBokingEvt} bokningsarray={assis_table_obj.table_obj} /> </div>)

    });

    //-+++++++className="innerdivs">Tid {this.selectTim()}:{this.selectMin()}
    return (
      <div className="MainBokingDiv">
        <h1 className="h1_header">Bokningar</h1>


          <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>
          
           <div className="innerdivs">Datum: <input type="date" id="valt_datum" value={this.state.valtDatumTextfelt} readOnly/></div>

          <div className="innerdivs"> 
            Tid: <input type="time" tabIndex="1" id="input_time" name="appt" onChange={this.newInputTimeChange} min="07:00" max="20:00" value={this.state.state_inputtime} required></input>
          </div>

          <div className="innerdivs">
            <ChoseAssistent tabIndex="2" assisarray={this.state.assistents} handleAssistentClick={this.handleAssistentClick} />
          </div>

          <div className="innerdivs">
            Behandling: {this.selectTreatment()}
          </div>

          <div className="innerdivs">
            Pris:
            <input tabIndex="5" id="idpris" type="text" size="4" onChange={this.editPrice} value={this.state.pris}/> 
            Swish: <input tabIndex="6" id="swishcheckbox" value={this.state.swish} type="checkbox" onChange={this.setBabsBool}/>
          </div>

          <div className="innerdivs">
            InternetBokning <input tabIndex="7" value={this.state.internetbokning} type="checkbox" id="b_internetboking" onChange={this.setInternetBokingBool} />
          </div>

          <hr/>
          
          <h3>Kund</h3>

          <div className="innerdivs">
            <div>Namn:<input tabIndex="8" type="text" id="textfelt_namn" /></div>
            <div>Tel:<input tabIndex="9" type="text" id="textfelt_tel"/></div>
            <div>
                  <input tabIndex="10" className='b_button' onClick={this.clickBoka} type="button" value="Boka"/>
                  <input tabIndex="11" className='b_button' onClick={this.clickAvbokaEvt} type="button" value="AvBoka"/>
                  id:<input type="text" size="20" readOnly value={this.state.state_bokningsId} />
            </div>
          </div>

          {bokningskoll_div}
            
          <hr/>
          
          <h3>Lista Bokningar {this.state.valtDatumTextfelt}</h3>
          
           { /*<BokingTable  valdBokingEvt={this.valdBokingEvt} bokningsarray={this.state.state_vald_dag_arraybokningar } / > */}
           { t_jsx_tables }

           <div>
            
           </div>  
          
      </div>
    )

  }
}//End of component-----------------------------------------------

JlBokingComp.propTypes = {
  // ...prop type definitions here
  assisarray: PropTypes.array
}

export default JlBokingComp;
