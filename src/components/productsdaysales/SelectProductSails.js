import React from 'react'
//import PropTypes from 'prop-types'

const SelectProductSails = (props) => {
  
  let t_assistents = props.assisarray;
  
  
  return (
    <div>
      Biträde: <select tabIndex="3" name="selbitrade" id="selbitrade" onChange={props.handleAssistentClick}>
        {t_assistents.map((assitent, index) => (
          <option value={assitent} key={index}>{assitent}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectProductSails