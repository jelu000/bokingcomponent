import React from 'react'

function SummeringTable(props) {


    let bokkningsarray =[];
    bokkningsarray = props.bokingsarray_prop;
    //Plockar ut namnet för varje biträde i varje bokning
    let assistents_name_array = bokkningsarray.map( (bokingobj) => {return bokingobj.t_assistent}  );
    //plockar ut unikt namn, dvs dubbeletter för biträden från arrayen med namn på biträden
    let uniquenames = [...new Set(assistents_name_array)];
    //console.log(`typeof: ${bokkningsarray[1].t_babs}`);

    let uniquenames_objects = [...new Set(bokkningsarray.t_assistent)];
    
    
    function createAssisIncomObj(t_bokning){
        
        let assistent = t_bokning.t_assistent;
        let pris = parseInt(t_bokning.t_price);
        let babs_bool = t_bokning.t_babs;
        let kassa = 0;
        let babs_inbet = 0;

        

        if (babs_bool){
            babs_inbet = pris;
        }
        else {
            kassa = pris;
        }

        return { 
            assistent: assistent,
            total: pris,
            babs_bool: babs_bool,
            kassa: kassa,
            babs_inbet: babs_inbet
        }
    }

    //const arr = uniquenames.filter( (assisname)  => assisname === "Rebels");

    let arr_tot_sum = bokkningsarray.reduce( (acc, b_obj) => { 
        return acc + parseInt(b_obj.t_price)
    }, 0);
    
    let arr = uniquenames.map( (assisname, i) => {

    } );
    
    //let totalAssisIncome = bokkningsarray.reduce(function (boking, pris) {
        //return acc + score;
      //}, 0);


    function getInkomstDag(){

    }

    let twoDsummaArray = [];

    uniquenames.forEach( (aname) =>{
console.log(`forEach`);
        let sammanlagt_pris = 0;
        let sammanlagt_babs = 0;
        let sammanlagt_kontant = 0;
        
        let bokkningsarray_lengt = bokkningsarray.length;

        let t_array = bokkningsarray.map( (bok_obj, i) =>{
            
            if (aname === bok_obj.t_assistent) {
                sammanlagt_pris = sammanlagt_pris + parseInt(bok_obj.t_price);

                if (bok_obj.t_babs) {
                    sammanlagt_babs = sammanlagt_babs + parseInt(bok_obj.t_price);
                }
                else {
                    sammanlagt_kontant = sammanlagt_kontant + parseInt(bok_obj.t_price);
                }
            
            
            }

            if (i === bokkningsarray_lengt-1){
                return {
                    assis: aname,
                    sammanlagt_pris: sammanlagt_pris,
                    sammanlagt_babs: sammanlagt_babs,
                    sammanlagt_kontant: sammanlagt_kontant
                }
            }
        } );

        twoDsummaArray.push(t_array);
    } );
    


console.log(`filter_array_assis ${JSON.stringify(twoDsummaArray)}`)

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
