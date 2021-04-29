import React from 'react'
import PropTypes from 'prop-types'
import './JlBokingComp.css'

class BokingTable extends React.Component {
  constructor(props){
    super(props);
  }

  printTable(){

    console.log(JSON.stringify(this.props.bokningsarray));
    let bokingsarray_prop = this.props.bokningsarray;
    let t_datatable = bokingsarray_prop.map( (bokingobject) => {
      return (
        <tr className="bordertable" key={bokingobject.t_id}>
          <td className="bordertable">{bokingobject.t_time}</td>
          <td className="bordertable">{bokingobject.t_name}</td>
          <td className="bordertable">{bokingobject.t_phone}</td>
          <td className="bordertable">{bokingobject.t_treatment}</td>
          <td className="bordertable">[+]</td>
        </tr>
      )
    })
  }

  render () {

    //Gör om prop till local array
    let bokingsarray_prop = this.props.bokningsarray;

    //Sorterar efter tid
    //Comperator Arrowfunktion
    //let compareTime = (boking_a, boking_b) => {
      //if (boking_a.t_time < boking_b.t_time){
        //return -1;
      //}
      //if (boking_a.t_time > boking_b.t_time){
        //return 1;
      //}
      //return 0;
    //}
    console.log("Ej Sorterad: " + JSON.stringify(bokingsarray_prop));
    function compareTime(boking_a, boking_b){

      let t_array_time1 = boking_a.t_time.split(":");
      let bokingtime1 = new Date().setHours(Number(t_array_time1[0]), t_array_time1[1], 0, 0);

      let t_array_time2 = boking_b.t_time.split(":");
      let bokingtime2 = new Date().setHours(Number(t_array_time2[0]), t_array_time2[1], 0, 0);

      if (bokingtime1 < bokingtime2){
        console.log(boking_a.t_time + "<" + boking_b.t_time);
        return -1;
      }

      if (bokingtime1 > bokingtime2){
        console.log(">");
        return 1;
      }
      return 0;
    }


    //Sorterar
    let bokingsarray = bokingsarray_prop.sort( compareTime );
    console.log("Sorterad!: " + JSON.stringify(bokingsarray));

    let t_datatable = bokingsarray.map( (bokingobject) => {
      return (
        <tr className="bordertable" key={bokingobject.t_id}>
          <td className="bordertable">{bokingobject.t_time}</td>
          <td className="bordertable">{bokingobject.t_name}</td>
          <td className="bordertable">{bokingobject.t_phone}</td>
          <td className="bordertable">{bokingobject.t_treatment}</td>
          <td className="bordertable"><button id={bokingobject.t_id}>Välj</button></td>
        </tr>
      )
    })




    return (
      <table id="b_bokningstable" className="bordertable">
        <thead>
        <tr className="bordertable">
          <th className="bordertable" id="b_t_tid">Tid</th>
          <th className="bordertable" id="b_t_namn">Namn</th>
          <th className="bordertable" id="b_t_tel">Tel</th>
          <th className="bordertable" id="b_t_behandling">Behandling</th>
          <th className="bordertable" id="b_t_valj">Välj</th>
        </tr>
        </thead>
        <tbody>
          { t_datatable }
        </tbody>
      </table>
    )

  }
}

export default BokingTable;
