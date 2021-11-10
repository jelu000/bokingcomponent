//npm install react-day-picker --save --legacy-peer-deps
//fick instalationfel med bara $ npm install react-day-picker --save
//https://stackoverflow.com/questions/64718633/unable-to-resolve-dependency-tree-reactjs
//http://react-day-picker.js.org/docs/getting-started
//http://react-day-picker.js.org/docs/getting-started
//package.json "homepage": "/bokingcomponent",
import React from 'react';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import './JlBokingComp.css';
import SweCalenderLang from "./SweCalenderLang";
import ChoseAssistent from "./ChoseAssistent";
import Bokning from "./Bokning";
import BokingTable from "./BokingTable";
//import DbBokingTest from "./DbBokingTest";
import LocalStorageHandler from './LocalStorageHandler';




class JlBokingComp extends React.Component {

  constructor(props){
    super(props);

    //let today_date1 = new Date();
    //let today_date = today_date1.toLocaleDateString();
    let today_date = new Date();
    //today_date = today_date.toLocaleDateString();
    console.log(today_date);

    this.state = {
      //För Kalender
      valtDatum: today_date, //ANVÄNDS EJ: Innehåller Datum strig från kalender ex: Tue Oct 26 2021 12:00:00 GMT+0200 (centraleuropeisk sommartid)
      valtDatumTextfelt: today_date.toLocaleDateString(), //Datumtextfält
      locale: 'swe',
      tidtim: '8',
      tidmin: '00',

      //För bokning - biträde
      assistents: ["Jens"],
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

    console.log(`valtDatumTextfelt: ${this.state.valtDatumTextfelt}`);

    this.clickDagEvent = this.clickDagEvent.bind(this);
    this.clickBoka = this.clickBoka.bind(this);
    this.clickMonthChange = this.clickMonthChange.bind(this);
    this.valdBokingEvt = this.valdBokingEvt.bind(this);
    this.clickAvbokaEvt = this.clickAvbokaEvt.bind(this);
  }//end of constructor----------------------------------------------


  /*clearTextInputs()------------------------------------------------------------------------------
    claer all textinputs after a boking
  */
  clearTextInputs(){

    document.getElementById("textfelt_namn").value = "";
    document.getElementById("textfelt_tel").value="";
    document.getElementById("selbitrade").selectedIndex=0;
    document.getElementById("id_treatment").selectedIndex=0;

    //Uppdaterar Tiden
    document.getElementById("id_min").selectedIndex=0;
    document.getElementById("id_timmar").selectedIndex=0;

    let t_treatment_name = document.getElementById("id_treatment").value
    let vald_treatment = this.state.behandlingar.find((t_object) => { return t_object.t_name === t_treatment_name; });
    //console.log(`pris: ${vald_treatment.t_price}`);
    
  
    this.setState({
      state_bokningsId: "",
      pris: vald_treatment.t_price
    });
  }

/*componentDidMount -------------------------------------------------------------------------------
Initate LocalStorage
*/
  componentDidMount(){
  //console.log("Did Mount");//
  //const t_bokingsarray = localStorage.getItem('bokningar');
  //console.log(`valtDatumTextfelt didMount: ${this.state.valtDatumTextfelt}`);

  let localStorageDB = new LocalStorageHandler();
  let t_array_behandlingar = localStorageDB.getTreatments();
  this.setState({
    state_vald_dag_arraybokningar: localStorageDB.getBokingsDay(this.state.valtDatumTextfelt),
    behandlingar: t_array_behandlingar,
    pris: t_array_behandlingar[0].t_price
  });
  
}//end of componentDidMount


//clickDagEvent-----------------------------------------------------------------------------------
  async clickDagEvent(dag){
    let t_dag = dag.toLocaleDateString();

    console.log(`ckicDagEvent line 112: ${t_dag}`);
    
    let localStorageDB = await new LocalStorageHandler();
    let dagensbokningar = await localStorageDB.getBokingsDay(t_dag);
    //console.log(`dagensbokningar: ${JSON.stringify(dagensbokningar)}`);
    
    await this.setState({
      valtDatum: dag,
      valtDatumTextfelt: t_dag,
    
      //state_vald_dag_arraybokningar: localStorageDB.getBokingsDay(this.state.valtDatumTextfelt) OBS detta funkade inte
      state_vald_dag_arraybokningar: dagensbokningar
     });
     
     this.clearTextInputs();
     //console.log(`Kill: ${this.state.valtDatum} : ${this.state.valtDatumTextfelt}`)
     this.setState({state_bokningskoll: ""});
     console.log(`clickDagEvent 119 state_bokningskoll ${this.state.state_bokningskoll}`);
  }

  //clickMonthChange()-----------------------------------------------------------------------------
  clickMonthChange(month){
    console.log(`månad: ${month}`);
    //Här ska ändras så att datum textfält stämmer när man byter månad

    this.clearTextInputs();

  }
  
  //clickBoka()------------------------------------------------------------------------------------
  async clickBoka(){

    if (document.getElementById("textfelt_namn").value ===""){
      alert("Namn på kund krävs!")
    }
    else{
      //let t_tid_tim = document.getElementById("id_timmar").value;
      //let t_tid_min = document.getElementById("id_min").value;
      //let t_tid = `${t_tid_tim}:${t_tid_min}`

      //hämtar tid och datum inputs
      let t_tid = this.state.tidtim + ":" + this.state.tidmin;
      //let t_datum = document.getElementById("valt_datum").value;
      let t_datum = this.state.valtDatumTextfelt;

      //hämtar id
      

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

        //skriver ut boknings koll text
        let bokningskoll_text = `${t_namn} är välkommen för ${t_behandling} kl ${this.state.tidtim}:${this.state.tidmin} den ${t_datum}.  `
        //Skapar boknings objekt från boknings klass
        let bokning = new Bokning(b_id ,t_tid, t_datum, t_namn, "TheEmail",  t_tel, t_assis, t_behandling, false, false);

        //console.log(JSON.stringify(bokning));

        //Local storage kanske för DB sen
        let localStorageDB = new LocalStorageHandler();
        let t_dagarray_bokningar = localStorageDB.addBoking(bokning);
        console.log(`addBoking: ${ JSON.stringify(t_dagarray_bokningar)}`);
        //let t_dagarray_bokningar = LocalStorageHandler.getBokingsDay(this.state.valtDatumTextfelt);
  
        
        //Rensar text inputs fällt i bokningsformuläret
        //sätter state och uppdaterar grafiskt användar gränssnitt för de komponenter som påverkas av detta
        await this.setState({
            
          state_bokningskoll: bokningskoll_text,
          //uppdatera bokningsId text med hjälpa av set state och nya b_id
          state_bokningsId: b_id,

          state_vald_dag_arraybokningar: t_dagarray_bokningar

          //Kanske för DB sen
          //state_dagensbokningar: bokningstest.getDayBokings(this.state.arraybokningar, t_datum)//valtDatumTextfelt
        })
        
        //this.state.state_dagensbokningar = bokningstest.getDayBokings(this.state.arraybokningar, t_datum);
      }
      //Om det är en ombokning
      else{
        //skriver ut boknings koll text
        let bokningskoll_text = `${t_namn} är välkommen för ${t_behandling} kl ${this.state.tidtim}:${this.state.tidmin} den ${t_datum}. BokningsId: ${this.state.state_bokningsId}  `
        //Skapar boknings objekt från boknings klass
        let bokning = new Bokning(this.state.state_bokningsId ,t_tid, t_datum, t_namn, "TheEmail",  t_tel, t_assis, t_behandling, false, false);

        //console.log(JSON.stringify(bokning));
        console.log(`Uppdatera!!! ${this.state.state_bokningsId} namn: ${bokning.t_name}`);
        //Local storage kanske för DB sen
        let localStorageDB = new LocalStorageHandler();
        let t_arraydag_bokningar = localStorageDB.updateBoking(this.state.state_bokningsId, bokning);
        await this.setState({
          state_bokningskoll: bokningskoll_text,
          //uppdaterar tabell med bokningar
          state_vald_dag_arraybokningar: t_arraydag_bokningar       
        })

        
      }

      this.clearTextInputs();

    }
  }

  //clickAvbokaEvt()--------------------------------------------------------------------------------
  async clickAvbokaEvt(e){
    console.log(`Avboka id: ${this.state.state_bokningsId}`);
    let lstore_handler = new LocalStorageHandler();
    await lstore_handler.deleteBoking(this.state.state_bokningsId);
    let t_array_dagbokningar = await lstore_handler.getBokingsDay(this.state.valtDatumTextfelt);

    await this.setState({
      state_vald_dag_arraybokningar: t_array_dagbokningar,
      state_bokningsId: ""
    });

    this.clearTextInputs();

  }

  //handleClickTim--------------------------------------------------------------------------------
  handleClickTim = (evt) => { this.setState({ tidtim: evt.target.value }) }
  selectTim(){
    let tim_array = ["8","9","10","11","12","13","14","15","16","17","18"];
    return (
      <select tabIndex="1" name="timmar" id="id_timmar" onClick={ this.handleClickTim }>
        {tim_array.map((tim, index) => (
          <option key={index+8} id={index+8}>{tim}</option>
        ))}

      </select>
    );
  }

  //handleClickMin-------------------------------------------------------------------------------
  handleClickMin = (evt) => { this.setState({ tidmin: evt.target.value }) }
  selectMin(){ 
    let min_array = ["00","15","30","45"];
    return (
      <select tabIndex="2" name="min" id="id_min" onChange={ this.handleClickMin }>
        {min_array.map((min) => (
          <option key={min}>{min}</option>
        ))}

      </select>
    );
  }

  //editPrice()--------------------------------------------------------------------------
  editPrice = (e) => {

    this.setState({
      pris: e.target.value
    });
  }

  //handleClickTreatment()---------------------------------------------------------------
  handleClickTreatment = (e) => {
    

    let vald_treatment = this.state.behandlingar.find((t_object) => { return t_object.t_name === e.target.value; });
    //console.log(`pris: ${vald_treatment.t_price}`);
    
    this.setState({ pris: vald_treatment.t_price});

  }
  //selectTreatment()-----------------------------------------------------------------------------
  selectTreatment(){

    return (
      <select tabIndex="4" name="treatment" id="id_treatment" onChange={ this.handleClickTreatment }>
        {this.state.behandlingar.map((behandling, index) => (
          <option value={behandling.t_name} key={index}>{behandling.t_name}</option>
        ))}

      </select>
    );
  }

  /* 
  valdBokingEvt(evt)
  In: callBack event from BokingTableButton that returns a Bokning object - used in BokingTableButton
  */
  valdBokingEvt(evt){
    
    //Kanske inte behövs för att uppdatera bokning - räcker med bokning id!
    console.log(`valdBokingEvt t_time: ${evt.t_time}`);
    let t_boking = new Bokning(evt.t_id, evt.t_time, evt.t_date, evt.t_name, evt.t_email, evt.t_phone, evt.t_assistent, evt.t_treatment, evt.t_inetboking, evt.t_babs);
    //används för att uppdatera vald bokning
    this.setState({state_valdBokning: t_boking});
    //-------
    
    document.getElementById("textfelt_namn").value = evt.t_name;
    document.getElementById("textfelt_tel").value = evt.t_phone;
     
    //Dela tid i tim och min 8:00 med split:
    const t_tidarray = evt.t_time.split(":");
    
    //Sätter selecter för tid
    document.getElementById("id_timmar").value=t_tidarray[0];
    document.getElementById("id_min").value=t_tidarray[1];
    //Sätter selecten för behandling
    document.getElementById("id_treatment").value=evt.t_treatment;
    //Sätter selecten för biträde
    //document.getElementById("id_treatment").value=evt.t_treatment;
    //Sätter input för pris
    document.getElementById("idpris").value="0";
    
    
    //console.log(`valdBokingEvt t_tim ${t_tidarray[0]}`);
    this.setState({
      state_valdBokning: evt, state_bokningsId: evt.t_id,
      tidtim: t_tidarray[0],
      tidmin: t_tidarray[1]
    });
    //this.setState({ tidmin: evt.target.value }

}//end of valdBokingEvt(evt)----------------------------------------------------

  //GAMMAL INPUT: value={this.state.valtDatum.toLocaleDateString()}
  
  //render()-------------------------------------------------------------------------------------------------
  render () {
       
    let bokningskoll_div;

    if (this.state.state_bokningskoll !== ""){
      bokningskoll_div = <div className="innerdivs"><p id="bokningskoll">{this.state.state_bokningskoll}</p></div>
    }
    
    return (
      <div className="MainBokingDiv">
        <h1>Bokningar</h1>


          <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} onMonthChangeEvent={this.clickMonthChange}/>
          
           <div className="innerdivs">Datum: <input type="date" id="valt_datum" value={this.state.valtDatumTextfelt} readOnly/></div>

          <div className="innerdivs">Tid {this.selectTim()}:{this.selectMin()}</div>

          <div className="innerdivs">
            <ChoseAssistent assisarray={this.state.assistents} />
          </div>

          <div className="innerdivs">
            Behandling: {this.selectTreatment()}
          </div>

          <div className="innerdivs">
            Pris:
            <input tabIndex="5" id="idpris" type="text" size="4" onChange={this.editPrice} value={this.state.pris}/> 
            Swish: <input tabIndex="6" type="checkbox"/>
          </div>

          <div className="innerdivs">
            InternetBokning <input tabIndex="7" type="checkbox" id="b_internetboking" />
          </div>



          <hr/>
          <h3>Kund</h3>

          <div className="innerdivs">
            <div>Namn:<input tabIndex="8" type="text" id="textfelt_namn" /></div>
            <div>Tel:<input tabIndex="9" type="text" id="textfelt_tel"/></div>
            <div>
                  <input tabIndex="10" onClick={this.clickBoka} type="button" value="Boka"/>
                  <input tabIndex="11" onClick={this.clickAvbokaEvt} type="button" value="AvBoka"/>
                  id:<input type="text" size="20" readOnly value={this.state.state_bokningsId} />
            </div>
          </div>

          
          {bokningskoll_div}
            

          <hr/>
          <h3>Lista Bokningar {this.state.valtDatumTextfelt}</h3>
          
           <BokingTable  valdBokingEvt={this.valdBokingEvt} bokningsarray={this.state.state_vald_dag_arraybokningar} / >
          

      </div>
    )

  }
}//End of component-----------------------------------------------

JlBokingComp.propTypes = {
  // ...prop type definitions here
  assisarray: PropTypes.array
}

export default JlBokingComp;
