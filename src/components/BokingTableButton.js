import React from 'react'
import PropTypes from 'prop-types'


function BokingTableButton(props) {

//console.log(`BokningsTableButton Object: ${props.bokning.t_name}`);
    //{this.props.id}
let onClick = (e) => {
 console.log(`BokinTableButton namn: ${props.bokning.t_name} Tid ${props.bokning.t_time}`);
props.state_valdBokningObject.t_name = props.bokning.t_name;

}


    return (
        
            <button type="button" id={props.id} onClick={onClick}> välj </button>
        
    )
}

BokingTableButton.propTypes = {
    boking: PropTypes.object,
    onClick: PropTypes.func
}

export default BokingTableButton

