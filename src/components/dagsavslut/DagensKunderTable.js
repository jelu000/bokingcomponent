import React from 'react'

export default function DagensKunderTable(props) {

    //let t_datatable = () => {}

      
    
    //Sorterar
      //let bokingsarray = bokingsarray_prop.sort( compareTime );
      let bokingsarray = props.bokingsarray_prop;

      

      //Sorterar bokningar på tid
      function compareTime(boking_a, boking_b){

        let t_array_time1 = boking_a.t_time.split(":");
        let bokingtime1 = new Date().setHours(Number(t_array_time1[0]), t_array_time1[1], 0, 0);

        let t_array_time2 = boking_b.t_time.split(":");
        let bokingtime2 = new Date().setHours(Number(t_array_time2[0]), t_array_time2[1], 0, 0);

        if (bokingtime1 < bokingtime2){
          //console.log(boking_a.t_time + "<" + boking_b.t_time);
          return -1;
        }

        if (bokingtime1 > bokingtime2){
          //console.log(">");
          return 1;
        }
        return 0;
      }

      //Sorterar
      bokingsarray.sort( compareTime );

      //Sorterar på assistentnamn

      bokingsarray.sort( (element_a, element_b) => {
        let ea = element_a.t_assistent.toLowerCase();
        let eb = element_b.t_assistent.toLowerCase();


        if (ea < eb){
          return -1;
        }
        if (ea > eb){
          return 1;
        }
        return 0;        
      });


      

      //console.log(`---------------------------------------`);
      //console.log(`Sort2: ${JSON.stringify(bokingsarray)}`);

      //console.log("Sorterad!: " + JSON.stringify(bokingsarray));
      //onClick={this.bokingTableRowClick}
    
      //Skriver ut tabell med bokmingar
      let t_datatable = bokingsarray.map( (bokingobject, i) => {
        
        //let bokning = new Bokning(bokingobject.t_id , bokingobject.t_time, bokingobject.t_date, bokingobject.t_name, bokingobject.t_email,  bokingobject.t_phone, bokingobject.t_assistent, bokingobject.t_treatment, bokingobject.t_inetboking, bokingobject.t_babs, bokingobject.t_price);
        let t_babs = "";
         if (bokingobject.t_babs)
           t_babs='Ja';        
         else
          t_babs = 'Nej';
        
        return (
          <tr className="bordertable" id={i}  key={i}>
            <td className="bordertable" data-title="t_tid">{bokingobject.t_time}</td>
            <td className="bordertable" data-title="t_assistent">{bokingobject.t_assistent}</td>
            <td className="bordertable" data-title="t_kund">{bokingobject.t_name}</td>
            <td className="bordertable" data-title="t_tel">{bokingobject.t_phone}</td>
            <td className="bordertable" data-title="t_behandling">{bokingobject.t_treatment}</td>
            <td className="bordertable" data-title="t_price">{bokingobject.t_price}</td>
            <td className="bordertable" data-title="t_babs">{t_babs}</td>
            
          </tr>
        )
      })



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
                { t_datatable }
                </tbody>
            </table>
        </div>
    )
}
