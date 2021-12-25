import React from 'react'

export default function TableProductDaySales(props) {

    let productarray = props.productarray_prop;
    let babsmark = ' \u274c '; 

    
/*
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
    
  */      
    
    let styleBabs = ( is_babs, babs_mark ) => {

    
        //let babsmarktrue = ' \u2713 '; 
        //let babsmarkfalse = ' \u274c ';
        
        let p_style = {};

        if (is_babs){
            p_style = {color: "green"}
        }

        return ( <p style={p_style}>{babs_mark}</p>)
    }

    
    let tablebody = productarray.map( (productobject, i) => {
            
        if (productobject.pd_babs)
            babsmark = ' \u2713 '; 
        else
        babsmark = ' \u274c '; 
            return (   
                
                    <tr className="producttable" id={i}  key={i}>
                        <td className="td_name" data-title="p_name">{productobject.pd_name}</td>
                        <td className="td_size" data-title="p_size">{productobject.pd_size}</td>
                        <td className="td_price" data-title="p_price">{productobject.pd_price}</td>
                        <td className="td_babs" data-title="p_babs">{styleBabs( productobject.pd_babs, babsmark)}</td>
                        <td className="td_pd_id" data-title="pd_id">{productobject.pd_id}</td>
                        <td className="td_butt" data-title="del"><button className="tableinputs" onClick={props.onTableButtClick} value={productobject.pd_id}> { "\u2713"} </button></td>
                       
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
                        <th className="" id="pd_del">Välj</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tablebody}
                </tbody>    
            </table>
            
        </div>
    )
}
