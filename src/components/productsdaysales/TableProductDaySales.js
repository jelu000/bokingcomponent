import React from 'react'

export default function TableProductDaySales(props) {

    let productarray = props.productarray_prop;
    let crossmark = ' \u274c '; 

    

    let daySaleChangeName = (evt) => {
        console.log(`daySaleChange: ${evt.target.value}`);
    }
    let daySaleChangeSize = (evt) => {
        console.log(`daySaleChange: ${evt.target.value}`);
    }
    let daySaleChangePrice = (evt) => {
        console.log(`daySaleChange: ${evt.target.value}`);
    }
    let daySaleChangeBabs = (evt) => {
        console.log(`daySaleChange: ${evt.target.value}`);
    }
    let daySaleChangeButt = (evt) => {
        console.log(`daySaleChange: ${evt.target.value}`);
    }

   
        let tablebody = productarray.map( (productobject, i) => {
            
            return (   
                
                    <tr className="producttable" id={i}  key={i}>
                        <td className="" data-title="p_name"><input onChange={daySaleChangeName} className="tableinputs" type="text" value={productobject.pd_name} /></td>
                        <td className="" data-title="p_size"><input className="tableinputs" onChange={daySaleChangeSize} type="text" value={productobject.pd_size} /></td>
                        <td className="" data-title="p_price"><input className="tableinputs" onChange={daySaleChangePrice} type="text" value={productobject.pd_price} /></td>
                        <td className="" data-title="p_babs"><input className="tableinputs" onChange={daySaleChangeBabs} type="checkbox" value={productobject.pd_babs} /></td>
                        <td className="" data-title="pd_id">{productobject.pd_id}</td>
                        <td className="" data-title="del"><button className="tableinputs" onClick={daySaleChangeButt} value=""> {crossmark} </button></td>
                       
                    </tr>
                
            )
    })

    return (
        <div>
            

            <table id="product_salestable" className="producttable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="" id="pd_namn">Produktnamn</th>
                        <th className="" id="pd_storlek">Volym</th>
                        <th className="" id="pd_pris">Pris</th>
                        <th className="" id="pd_babs">Swish</th>
                        <th className="" id="pd_id">Id</th>
                        <th className="" id="pd_del">Delete</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tablebody}
                </tbody>    
            </table>
            
        </div>
    )
}
