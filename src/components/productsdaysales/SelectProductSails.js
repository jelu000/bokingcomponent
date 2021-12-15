import React from 'react'
//import PropTypes from 'prop-types'

const SelectProductSails = (props) => {
  
  let t_productarray = props.product_array;
  
  
  return (
    <div>
      Biträde: <select tabIndex="3" className='selectproduct' id="select_prodsails" onChange={props.handleProdSelect}>
        {t_productarray.map((product, index) => (
          <option id={index} value={product} key={product.p_id}>{product.p_name}, {product.p_size}ml, {product.p_price}:- </option>
        ))}
      </select>
    </div>
  )
}

export default SelectProductSails