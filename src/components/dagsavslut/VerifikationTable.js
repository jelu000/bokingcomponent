import React from 'react'

export default function VerifikationTable(props) {

    let vertable = [];
    let summa_arbete={assistent: "", sammanlagt_pris: 0, sammanlagt_babs: 0, sammanlagt_kontant: 0};
    let summadaysails={totalt: 0, kassa: 0, swish: 0 }; 
    
    summa_arbete = props.summa_lastrow_obj;
    summadaysails = props.summadaysails;

    let summa_kassa = summa_arbete.sammanlagt_kontant + summadaysails.kassa;
    let summa_babs = summa_arbete.sammanlagt_babs + summadaysails.swish;

    if (summa_kassa > 0){
        let t_row = {kontonr: "1910", kontonamn: "Kassa", debet: summa_kassa, kredit: "" };
        vertable.push(t_row);
    }

    if (summa_babs > 0){
        let t_row = {kontonr: "1930", kontonamn: "Bankkonto", debet: summa_babs, kredit: "" };
        vertable.push(t_row);
    }
    //let utg_moms =
    let intekt_sails =  parseInt(summadaysails.totalt * 0.8);
    let intekt_arbete =  parseInt(summa_arbete.sammanlagt_pris * 0.8);
    let  utg_moms = (summa_kassa + summa_babs) - (intekt_sails+intekt_arbete);

    if (utg_moms > 0){
        let t_row = {kontonr: "2611", kontonamn: "Utgående moms", debet: "", kredit: utg_moms };
        vertable.push(t_row);
    }
    if (intekt_arbete > 0){
        let t_row = {kontonr: "3041", kontonamn: "Försäljning av tjänst", debet: "", kredit: intekt_arbete };
        vertable.push(t_row);
    }
    if (intekt_sails > 0){
        let t_row = {kontonr: "3051", kontonamn: "Försäljning av varor", debet: "", kredit: intekt_sails };
        vertable.push(t_row);
    }



    //tInnerdatatable-----------------------------------------------------------------------
    let tInnerdatatable = vertable.map( (obj, i) => {
        //let tInnerdatatable = hel_tabell_array.map( (bokingobject, i) => {
            return (
            <tr className="bordertable" id={i}  key={i}>
                <td className="bordertable" data-title="t_kontonr">{obj.kontonr}</td>
                <td className="bordertable" data-title="t_kontonamn">{obj.kontonamn}</td>
                <td className="bordertable" data-title="t_debet">{obj.debet}</td>
                <td className="bordertable" data-title="t_kredit">{obj.kredit}</td>
            
            </tr>
            )
        })//end of t_tInnerdatatable

    return (
        <div>
            <table id="b_bokningstable" className="bordertable">
                <thead>
                    <tr className="bordertable">
                        
                        <th className="bordertable" id="t_kontonr">Konto nr</th>
                        <th className="bordertable" id="t_kontonamn">Konto namn</th>
                        <th className="bordertable" id="t_debet">Debet</th>
                        <th className="bordertable" id="t_kredit">Kredit</th>                        
                    </tr>
                </thead>
                <tbody>
                    { tInnerdatatable }
                </tbody>
            </table>
            
        </div>
    )
}
