//import React from 'react'
import React from 'react';

function SummeringTable(props) {


     //Använder useState för att lägga till totala inarbetat inkomster rad object
     //const [object_total_income, setTotalIncomeObject] = useState({});

    
    let summabokingtable =[];
    summabokingtable = props.summabokingtable;
    
    //let bokkningsarray =[];
    //bokkningsarray = props.bokingsarray_prop;

    
    //Plockar ut namnet för varje biträde i varje bokning
    //let assistents_name_array = bokkningsarray.map( (bokingobj) => {return bokingobj.t_assistent}  );
    //plockar ut unikt namn, dvs dubbeletter för biträden från arrayen med namn på biträden
    //let uniquenames = [...new Set(assistents_name_array)];
    
    //för att dela upp array med assistent object baserat på namn så man vet vad varje arbetat in     
    //let uppdelad_namn_array = [];

    //let summa_row_to_add = {};

   

//forEach()To greate array for unic Assistent-------------------------------------------------------------------------
  /*  uniquenames.forEach( (t_name, i) => {
        //console.log(`for: ${i}  : ${t_name}`);
    
            
        let sammanlagt_pris = 0;
        let sammanlagt_babs = 0;
        let sammanlagt_kontant = 0;
        
                    
        let t_object= {};

        bokkningsarray.forEach( (bok_obj, i) => {

            
        if (bok_obj.t_assistent === t_name){

            sammanlagt_pris = sammanlagt_pris + parseInt(bok_obj.t_price);

            if (bok_obj.t_babs) {
                sammanlagt_babs = sammanlagt_babs + parseInt(bok_obj.t_price);
            }
            else {
                sammanlagt_kontant = sammanlagt_kontant + parseInt(bok_obj.t_price);
            }

            t_object = {
                assistent: t_name,
                sammanlagt_pris: sammanlagt_pris,
                sammanlagt_babs: sammanlagt_babs,
                sammanlagt_kontant: sammanlagt_kontant
            }                    
                
        }
    
    });

       

        uppdelad_namn_array.push(t_object);

    });*/   
    //End of outer forEach();------------------------------------------------------------------------------------

    //console.log(`uppdelad_namn_array: ${ JSON.stringify(uppdelad_namn_array)} length: ${uppdelad_namn_array.length} `);


    //createLastSummaRow()---------------------------------------------------------------------------------------------------
    /*function createLastSummaRow(){
    
        let kassa = 0, babs = 0, totalt = 0;

        uppdelad_namn_array.forEach( (rowobject, i) => {
            
            
            totalt += rowobject.sammanlagt_pris;
            kassa +=  rowobject.sammanlagt_kontant;
            babs += rowobject.sammanlagt_babs;

       
        });
        
        let t_object = {
            assistent: "SUMMA",
            sammanlagt_pris: totalt,
            sammanlagt_babs: babs,
            sammanlagt_kontant: kassa
        }
       
        
        return t_object;
    }*/ 
    //end of createLastSummaRow() ------------------------------------------------------------

    
    
    //let summa_row_to_add =  createLastSummaRow();
    //summa_row_to_add =  createLastSummaRow();

    //lägger till rad object till State
    //setTotalIncomeObject(summa_row_to_add);   
    //console.log(`summaArray ${JSON.stringify(summa_row_to_add)}`);
    
    //let hel_tabell_array = uppdelad_namn_array;
    //hel_tabell_array.push(summa_row_to_add);

    //använder props och lägger till state summa tot_int_arbete och babs tot_int_babs i föräldercomponent Dagsavslut
    //props.setStateIntakter(summa_row_to_add.sammanlagt_pris, 0);
    
// let tInnerdatatable = hel_tabell_array.map( (bokingobject, i) => {



//tInnerdatatable-----------------------------------------------------------------------
    let tInnerdatatable = summabokingtable.map( (bokingobject, i) => {
    //let tInnerdatatable = hel_tabell_array.map( (bokingobject, i) => {
        return (
        <tr className="bordertable" id={i}  key={i}>
            <td className="bordertable" data-title="t_assistent">{bokingobject.assistent}</td>
            <td className="bordertable" data-title="t_kassa">{bokingobject.sammanlagt_kontant}</td>
            <td className="bordertable" data-title="t_babs">{bokingobject.sammanlagt_babs}</td>
            <td className="bordertable" data-title="t_totalt">{bokingobject.sammanlagt_pris}</td>
        
        </tr>
        )
    })//end of t_tInnerdatatable
   
 //---------------------------------------------------------------------------------------
    

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
                    { tInnerdatatable }
                </tbody>
            </table>
        </div>
    )


     
}

export default SummeringTable
