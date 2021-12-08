import React, { Component } from 'react'

export default class ProductTable extends Component {

    constructor(props){
        super(props);



    }

    render() {
        return (
            <div>
                <table id="p_productstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        <th className="bordertable" id="p_column_name">Produkt namn</th>
                        <th className="bordertable" id="p_column_price">Pris</th>
                        <th className="bordertable" id="p_column_size">Storlek</th>
                        <th className="bordertable" id="p_column_id">Id</th>                        
                    </tr>
                </thead>
                <tbody>
                {  }
                </tbody>
            </table>

            </div>
        )
    }
}
