import React from 'react'

export default function DagensKunderTable() {

    let t_datatable = () => {
        
    }

    return (
        <div>
            <table id="b_bokningstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        <th className="bordertable" id="t_tid">Tid</th>
                        <th className="bordertable" id="t_assistent">Biträde</th>
                        <th className="bordertable" id="t_kund">Kund</th>
                        <th className="bordertable" id="t_tel">Tel</th>
                        <th className="bordertable" id="t_behandling">Behandling</th>
                        <th className="bordertable" id="t_price">Pris</th>
                        <th className="bordertable" id="t_babs">Swish</th>
                    </tr>
                </thead>
                <tbody>
                { /*t_datatable*/ }
                </tbody>
            </table>
        </div>
    )
}
