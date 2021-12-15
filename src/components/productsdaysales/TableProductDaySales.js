import React from 'react'

export default function TableProductDaySales(props) {

    let productarray = props.productarray_prop;

        let tablebody = productarray.map( (bokingobject, i) => {
            return (   
                <tbody>
                    <tr className="producttable" id={1}  key={1}>
                        <td className="bordertable" data-title="t_totalt">{bokingobject.p_name}</td>
                        <td className="bordertable" data-title="t_kassa">{bokingobject.p_size}</td>
                        <td className="bordertable" data-title="t_swish">{bokingobject.p_price}</td>
                    </tr>
                </tbody>
            )
    })

    return (
        <div>
            <table id="product_salestable" className="producttable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="bordertable" id="p_produkt">Produkt</th>
                        <th className="bordertable" id="p_storlek">Storlek</th>
                        <th className="bordertable" id="p_pris">Pris</th>
                                        
                    </tr>
                </thead>
                
            </table>
            
        </div>
    )
}
