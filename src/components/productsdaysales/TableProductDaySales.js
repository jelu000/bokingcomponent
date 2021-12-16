import React from 'react'

export default function TableProductDaySales(props) {

    let productarray = props.productarray_prop;

        let tablebody = productarray.map( (productobject, i) => {
            return (   
                <tbody>
                    <tr className="producttable" id={1}  key={1}>
                        <td className="bordertable" data-title="p_name">{productobject.p_name}</td>
                        <td className="bordertable" data-title="p_size">{productobject.p_size}</td>
                        <td className="bordertable" data-title="p_price">{productobject.p_price}</td>
                        <td className="bordertable" data-title="p_babs">{productobject.p_size}</td>
                        <td className="bordertable" data-title="p_id">{productobject.p_price}</td>
                        <td className="bordertable" data-title="del">del</td>
                    </tr>
                </tbody>
            )
    })

    return (
        <div>
            <table id="product_salestable" className="producttable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="bordertable" id="p_produkt">Produktnamn</th>
                        <th className="bordertable" id="p_storlek">Storlek</th>
                        <th className="bordertable" id="p_pris">Pris</th>
                        <th className="bordertable" id="p_babs">Swish</th>
                        <th className="bordertable" id="p_id">Id</th>
                        <th className="bordertable" id="p_id">Delete</th>
                    </tr>
                </thead>
                
            </table>
            
        </div>
    )
}
