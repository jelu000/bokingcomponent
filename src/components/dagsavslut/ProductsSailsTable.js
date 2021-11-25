import React from 'react'

export default function ProductsSailsTable(props) {
    
    
    return (
        <div>
            
            <table id="b_bokningstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="bordertable" id="t_totalt">Totalt</th>
                        <th className="bordertable" id="t_kassa">Kassa</th>
                        <th className="border{innertable }table" id="t_swish">Swish</th>
                                        
                    </tr>
                </thead>
                <tbody>
                <tr className="bordertable" id={1}  key={1}>
                    <td className="bordertable" data-title="t_totalt">{props.productssailstable.totalt}</td>
                    <td className="bordertable" data-title="t_kassa">{props.productssailstable.kassa}</td>
                    <td className="bordertable" data-title="t_swish">{props.productssailstable.swish}</td>
                   
                
                </tr>
                </tbody>
            </table>

        </div>
    )
}
