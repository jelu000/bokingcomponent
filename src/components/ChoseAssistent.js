import React from 'react'
//import PropTypes from 'prop-types'

const ChoseAssistent = (props) => {
  
  let t_assistents = props.assisarray;
  
  
  return (
    <div>
      Biträde: <select tabIndex="3" name="selbitrade" id="selbitrade" onChange={props.handleAssistentClick}>
        {t_assistents.map((assitent, index) => (
          <option key={index}>{assitent}</option>
        ))}
      </select>
    </div>
  )
}
//ChoseAssistent.propTypes = {
  // ...prop type definitions here
//}
export default ChoseAssistent
