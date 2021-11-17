import React from 'react'

function SummeringTable(props) {



    let bokkningsarray = props.bokingsarray_prop;

    let assistents_name_array = bokkningsarray.map( (bokingobj) => {return bokingobj.t_assistent}  );
    let uniquename = [... new Set(assistents_name_array)];



console.log(`filter_array_assis ${uniquename.length}`)

    return (
        <div>
            <table id="b_bokningstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="bordertable" id="t_assistent">Biträde</th>
                        <th className="bordertable" id="t_kassa">Kassa</th>
                        <th className="bordertable" id="t_babs">Swish</th>
                        <th className="bordertable" id="t_totalt">Totalt</th>                        
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
    )
}

export default SummeringTable
