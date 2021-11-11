import React from 'react'
import { useDebugValue } from 'react';
//import PropTypes from 'prop-types'
import Bokning from "./Bokning";
import BokingTableButton from "./BokingTableButton";
import './JlBokingComp.css'

class BokingTable extends React.Component {
  constructor(props){
    super(props);
 
    this.valdBokingEvt = this.valdBokingEvt.bind(this);
  }

valdBokingEvt(e){
  console.log(`BokingTable.valdBokingEvt ${e.t_time}`);
  this.props.valdBokingEvt(e);
}



render () {

    //Gör om prop till local array
    let bokingsarray_prop = this.props.bokningsarray;
   

    function compareTime(boking_a, boking_b){

      let t_array_time1 = boking_a.t_time.split(":");
      let bokingtime1 = new Date().setHours(Number(t_array_time1[0]), t_array_time1[1], 0, 0);

      let t_array_time2 = boking_b.t_time.split(":");
      let bokingtime2 = new Date().setHours(Number(t_array_time2[0]), t_array_time2[1], 0, 0);

      if (bokingtime1 < bokingtime2){
        //console.log(boking_a.t_time + "<" + boking_b.t_time);
        return -1;
      }

      if (bokingtime1 > bokingtime2){
        //console.log(">");
        return 1;
      }
      return 0;
    }

    //Sorterar
    let bokingsarray = bokingsarray_prop.sort( compareTime );
    //console.log("Sorterad!: " + JSON.stringify(bokingsarray));
    //onClick={this.bokingTableRowClick}
  
    //Skriver ut tabell med bokmingar
    let t_datatable = bokingsarray.map( (bokingobject) => {
      
      let bokning = new Bokning(bokingobject.t_id , bokingobject.t_time, bokingobject.t_date, bokingobject.t_name, bokingobject.t_email,  bokingobject.t_phone, bokingobject.t_assistent, bokingobject.t_treatment, bokingobject.t_inetboking, bokingobject.t_babs, bokingobject.t_price);

      return (
        <tr className="bordertable" id={bokingobject.t_id}  key={bokingobject.t_id}>
          <td className="bordertable" data-title="t_time">{bokingobject.t_time}</td>
          <td className="bordertable" data-title="t_name">{bokingobject.t_name}</td>
          <td className="bordertable" data-title="t_phone">{bokingobject.t_phone}</td>
          <td className="bordertable" data-title="t_treatment">{bokingobject.t_treatment}</td>
          <td className="bordertable" value={bokingobject.t_name}> <BokingTableButton bokning={bokning} state_valdBokningObject={this.props.state_valdBokningObject} id={bokingobject.t_id} valdBokingEvt={this.valdBokingEvt}/> </td>
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
