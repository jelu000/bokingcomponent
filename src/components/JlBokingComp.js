//npm install react-day-picker --save --legacy-peer-deps
//fick instalationfel med bara $ npm install react-day-picker --save
//https://stackoverflow.com/questions/64718633/unable-to-resolve-dependency-tree-reactjs
//http://react-day-picker.js.org/docs/getting-started
//http://react-day-picker.js.org/docs/getting-started
import React from 'react';
import PropTypes from 'prop-types';
import 'react-day-picker/lib/style.css';
import './JlBokingComp.css';
import SweCalenderLang from "./SweCalenderLang";
import ChoseAssistent from "./ChoseAssistent";
import Bokning from "./Bokning";
import BokingTable from "./BokingTable";
import DbBokingTest from "./DbBokingTest";



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
      valtDatum: today_date,
      valtDatumTextfelt: today_date.toLocaleDateString(),
      locale: 'swe',
      tidtim: '8',
      tidmin: '00',

      //För bokning
      assistents: ["Jens"],
      behandlingar: ["klipning", "färgning", "slinger"],
      pris: 0,
      swish: false,
      internetbokning: false,

      state_kund: '',


      state_bokningskoll: 'Bokningskoll',
      state_bokningsId: '',

      arraybokningar: [],
      //state_vald_dag_arraybokningar: [],
      state_valdBokning: Object

    };

    console.log(`valtDatumTextfelt: ${this.state.valtDatumTextfelt}`);

    this.clickDagEvent = this.clickDagEvent.bind(this);
    this.clickBoka = this.clickBoka.bind(this);
  }//end of constructor


  /*clearTextInputs()
    claer all textinputs after a boking
  */
  clearTextInputs(){

    document.getElementById("textfelt_namn").value = "";
    document.getElementById("textfelt_tel").value="";
    document.getElementById("selbitrade").selectedIndex=0;
    document.getElementById("id_treatment").selectedIndex=0;
  }

/*componentDidMount
Initate LocalStorage
*/
  componentDidMount(){
  //console.log("Did Mount");
  const t_bokingsarray = localStorage.getItem('bokningar');
  //console.log(`valtDatumTextfelt didMount: ${this.state.valtDatumTextfelt}`);

  if (t_bokingsarray){
    const savedBokings = JSON.parse(t_bokingsarray);

    this.setState({
      arraybokningar: savedBokings
    });
    //console.log('ComponentDidMount-Alla bokningar: ', t_bokingsarray);
    console.log('ComponentDidMount-Alla bokningar');
  }
  else{
    console.log('ComponentDidMount-Inga bokningar');
  }
}//end of componentDidMount



  clickDagEvent(dag){
    let t_dag = dag.toLocaleDateString();

    //let t_array_dagens_bokningar = this.state.arraybokningar.filter(function (e) {
    //return e.t_date === t_dag;
    //});

    this.setState({
      valtDatum: dag,
      valtDatumTextfelt: t_dag,
      //state_vald_dag_arraybokningar: t_array_dagens_bokningar
     });
    //console.log(t_dag);

    //console.log(`valtDatumTextfelt clickDagEvent: ${this.state.valtDatumTextfelt} : ${document.getElementById("valt_datum").value} `);
  }
  async clickBoka(){

    //let t_tid_tim = document.getElementById("id_timmar").value;
    //let t_tid_min = document.getElementById("id_min").value;
    //let t_tid = `${t_tid_tim}:${t_tid_min}`
    let t_tid = this.state.tidtim + ":" + this.state.tidmin;
    let t_datum = document.getElementById("valt_datum").value;


    let t_namn = document.getElementById("textfelt_namn").value;
    //let t_namn = this.state.state_kund;
    let t_tel = document.getElementById("textfelt_tel").value;
    let t_assis = document.getElementById("selbitrade").value;
    let t_behandling = document.getElementById("id_treatment").value;


    let b_id = Date.now();
    //console.log(b_id);
    let bokningskoll_text = `${t_namn} är välkommen för ${t_behandling} kl ${this.state.tidtim}:${this.state.tidmin} den ${t_datum}. BokningsId: ${b_id}  `
    let bokning = new Bokning(b_id ,t_tid, t_datum, t_namn, "TheEmail",  t_tel, t_assis, t_behandling, false, false);

    //console.log(JSON.stringify(bokning));

    //Kanske för DB sen
    //let bokningstest = new DbBokingTest();

    await this.setState({
        arraybokningar: [...this.state.arraybokningar, bokning],
        state_bokningskoll: bokningskoll_text,
        state_bokningsId: b_id,

        //Kanske för DB sen
        //state_dagensbokningar: bokningstest.getDayBokings(this.state.arraybokningar, t_datum)//valtDatumTextfelt
    })

    localStorage.setItem('bokningar', JSON.stringify(this.state.arraybokningar));
    //console.log("Längd: " + this.state.state_dagensbokningar.length);
    this.clearTextInputs()
    //this.state.state_dagensbokningar = bokningstest.getDayBokings(this.state.arraybokningar, t_datum);

  }

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

  selectTreatment(){

    return (
      <select tabIndex="4" name="treatment" id="id_treatment">
        {this.state.behandlingar.map((behandling, index) => (
          <option key={index}>{behandling}</option>
        ))}

      </select>
    );
  }
  //GAMMAL INPUT: value={this.state.valtDatum.toLocaleDateString()}
  render () {

    /*Detta tar plockar ut dagens bokningar från localstorage för att visa i BokingTable.
    Så detta behövs ej om man hämtar dagar med bokningar från databas!
    Då kommer arraybokningar att vara dag bokningar och inte alla bokningar.
    */
    let valtdatum = this.state.valtDatumTextfelt;

    let t_array_dagens_bokningar = this.state.arraybokningar.filter(function (e) {
    return e.t_date === valtdatum;
    });
    //Slut på dag bokningar

    return (
      <div className="MainBokingDiv">
        <h1>Bokningar</h1>


          <SweCalenderLang id="swekalender" valtdatum={this.state.valtDatum} onDayClickEvent={this.clickDagEvent} />
          <div className="innerdivs">Datum: <input type="date" id="valt_datum" value={this.state.valtDatumTextfelt} readOnly/></div>



          <div className="innerdivs">Tid {this.selectTim()}:{this.selectMin()}</div>

          <div className="innerdivs">
            <ChoseAssistent assisarray={this.state.assistents} />
          </div>

          <div className="innerdivs">
            Behandling: {this.selectTreatment()}
          </div>

          <div className="innerdivs">
            Pris:<input tabIndex="5" id="idpris" type="text" size="4"/> Swish:<input tabIndex="6" type="checkbox"/>
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
                  <input tabIndex="11" type="button" value="AvBoka"/>
                  id:<input type="text" size="20" readOnly value={this.state.state_bokningsId} />
            </div>
          </div>


          <div className="innerdivs"><p id="bokningskoll">{this.state.state_bokningskoll}</p></div>



          <hr/>
          <h3>Lista Bokningar {this.state.valtDatumTextfelt}</h3>

          <BokingTable valtkalenederdatum={this.state.valtDatumTextfelt} bokningsarray={t_array_dagens_bokningar} / >


      </div>
    )

  }
}

JlBokingComp.propTypes = {
  // ...prop type definitions here
  assisarray: PropTypes.array
}

export default JlBokingComp;
