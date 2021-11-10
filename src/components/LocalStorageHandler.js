//import Bokning from "./Bokning";
import Treatment from "./behandlingar/Treatment";
//LocalStorageHandler simulerar Databas för åtkomst REST api

export default class LocalStorageHandler {
    constructor(){
        this.key = 'bokningar';

        
        
        //För Simuler Databas med behandlingar-----------------------------------------------
        let treatment_array = [{t_id: "1", t_name: "Klippning", t_time: "45", t_price: "600"}];
        
        let t_treat = new Treatment("2", "Färgning", "60", "1000" );
        treatment_array.push(t_treat);
                
        treatment_array.push(new Treatment("3", "Slingor", "75", "1200" ));
        treatment_array.push(new Treatment("4", "Klippning & Färgning", "120", "1600" ));
        
        this.global_treatment_array = treatment_array;//Databas med behandlingar
    
    }

    getBokingsDay(t_datum){
        //OBS! Denna JSON sträng kan inte vara tom för då funkar inte programmet först gången man startar det!! 
        let json_string = "[]";//skapar tom json sträng 

        if ( localStorage.getItem(this.key) !== null ){//om localstorage inte är tom
            json_string =  localStorage.getItem(this.key);//fyll data från localstorage till json_string
            //console.log(`LocalStorageHandler:getBokingDay(t_datum) = ${json_string}`);
        }
        
        let bokingArray = [];
        try{
            bokingArray = JSON.parse(json_string);//omvandla json string till array men boking objects
            //Plocka ut boking objects för valt datum
        }
        catch (e){
            console.log(e);
        }
        
            let bokingDayArray = bokingArray.filter( (t_index) =>{ return t_index.t_date === t_datum });
        
        //exempel arrowfunction
        //let bokingDayArray = bokingArray.filter( (t_index) =>{ return t_index.t_date === t_datum });
        //exempel vanlig function
        //let bokingDayArray = bokingArray.filter(function (t_index) { return t_index.datum === t_datum; });
        
        //console.log(`LocalStorageHandler.getBokingDay ${JSON.stringify(bokingDayArray)}`);

        return bokingDayArray;
    }

    
    addBoking(new_boking_obj){

        let json_string = "[]";//skapar tom json sträng 

        if ( localStorage.getItem(this.key) !== null ){//om localstorage inte är tom
            //Hämtar jsons sträng array från LocalStorage med bokningar
            json_string =  localStorage.getItem(this.key);//fyll data från localstorage till json_string
        }
        //console.log(`LocalStorage.addBoking: ${json_string}`);
        let bokingArrayObjects = [];
       
        try {
            //Gör om JSON stäng med bokningsOject till javascript object
            bokingArrayObjects = JSON.parse(json_string);
            //Lägger till det nya bokningsobjectet
            bokingArrayObjects.push(new_boking_obj);
            //Sparar ner de till LocalStorage
            localStorage.setItem(this.key, JSON.stringify(bokingArrayObjects));
        }
        catch (e){
            console.log(e);
        }
           
        //hämtar bokningar för vald dag från localStorage och returnerar dem
        return this.getBokingsDay(new_boking_obj.t_date);

    }

    updateBoking(id, new_boking_obj){
        
        //Hämtar array från LocalStorage med bokningar
        let bokingArray = localStorage.getItem(this.key);
        //Parse ttill javascript object
        let bokingarray_obj = JSON.parse(bokingArray);
        //Hitta  index nummer för valt boknings-id     
        let t_index = bokingarray_obj.findIndex((obj => obj.t_id === id));

        //console.log(`Uppdatera index plats: ${t_index}`);
        //Tilldelar index i array till de uppdaterade boknings objektet
        bokingarray_obj[t_index] = new_boking_obj;
        //Sparar ner de till LocalStorage
        localStorage.setItem(this.key, JSON.stringify(bokingarray_obj));
        //hämtar bokningar för vald dag från localStorage och returnerar dem
        return this.getBokingsDay(new_boking_obj.t_date);
        


    }
    deleteBoking(id){
         //Hämtar array från LocalStorage med bokningar
         let bokingArray = localStorage.getItem(this.key);
         let bokingarray_obj = JSON.parse(bokingArray);

         let t_filtered_bokings = bokingarray_obj.filter( bokobj =>  bokobj.t_id !== id);

         //let t_filtered_bokings_json = JSON.stringify(t_filtered_bokings);
         //console.log(t_filtered_bokings_json);

         localStorage.setItem(this.key, JSON.stringify(t_filtered_bokings));
         
    }

    getTreatments(){
        

       // console.log(`getTreatments(): ${JSON.stringify(treatment_array)}`);

        return this.global_treatment_array;
        
    }

    

}
