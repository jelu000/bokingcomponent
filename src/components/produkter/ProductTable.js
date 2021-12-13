import React from 'react'
//import Product from './Product';

export default function ProductTable(props) {

    let productsarray = props.product_array;         
             
             
    let t_datatable = productsarray.map( (product, i) => {
        let check = ' \u2713 '; 
        //let p_name = "KLICKA";
        //p_name = product.p_name;

        return (
          <tr className="bordertable" id={product.p_id}  key={product.p_id}>
            <td className="bordertable" data-title="namn">{product.p_name}</td>
            <td className="bordertable" data-title="pris">{product.p_price}</td>
            <td className="bordertable" data-title="storlek">{product.p_size}</td>
            <td className="bordertable" data-title="id">{product.p_id}</td>
            <th className="bordertable" id="vald"><button type="button" value={product} className="checktablebutt" id={product.p_id} onClick={props.productTableButtClick}> {check} </button></th>
            
          </tr>
        )
      });
             



     
        return (
            <div>
                <table id="p_productstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        <th className="bordertable" id="p_column_name">Produkt namn</th>
                        <th className="bordertable" id="p_column_price">Pris</th>
                        <th className="bordertable" id="p_column_size">Storlek</th>
                        <th className="bordertable" id="p_column_id">Id</th>
                        <th className="bordertable" id="p_column_butt">välj</th>                          
                    </tr>
                </thead>
                <tbody>
                { t_datatable }
                </tbody>
            </table>

            </div>
        )
    
}
