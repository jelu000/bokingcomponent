import React from 'react'
import PropTypes from 'prop-types'
import './JlBokingComp.css'

class BokingTable extends React.Component {
  constructor(props){
    super(props);
  }

  render () {

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

        </tbody>
      </table>
    )

  }
}

export default BokingTable;
