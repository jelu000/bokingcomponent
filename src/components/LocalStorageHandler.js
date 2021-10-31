//import Bokning from "./Bokning";
//LocalStorageHandler simulerar Databas för åtkomst REST api

export default class LocalStorageHandler {
    constructor(){
        this.key = 'bokningar';
    
    }

    getBokingsDay(t_datum){

        let json_string = "";//skapar tom json sträng 

        if ( localStorage.getItem(this.key) !== null )//om localstorage inte är tom
         json_string =  localStorage.getItem(this.key);//fyll data från localstorage till json_string
        
        let bokingArray = JSON.parse(json_string);//omvandla json string till array men boking objects
        //Plocka ut boking objects för valt datum
        let bokingDayArray = bokingArray.filter( (t_index) =>{ return t_index.t_date === t_datum });
        
        //exempel arrowfunction
        //let bokingDayArray = bokingArray.filter( (t_index) =>{ return t_index.t_date === t_datum });
        //exempel vanlig function
        //let bokingDayArray = bokingArray.filter(function (t_index) { return t_index.datum === t_datum; });
        
        //console.log(`LocalStorageHandler.getBokingDay ${JSON.stringify(bokingDayArray)}`);

        return bokingDayArray;
    }

    
    addBoking(new_boking_obj){

        
        //Hämtar array från LocalStorage med bokningar
        let bokingArray = localStorage.getItem(this.key);
        console.log(`LocalStorage.addBoking: ${bokingArray}`);
        let bokingArrayObjects = JSON.parse(bokingArray);
        //Lägger till de nya bokningsobjektet till arrayen
        bokingArrayObjects.push(new_boking_obj); 
        //console.log(`Class LoacalStorageHandler lägger till: ${new_boking_obj}`);
        //Sparar ner de till LocalStorage
        localStorage.setItem(this.key, JSON.stringify(bokingArrayObjects));
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

         let t_filtered_bokings_json = JSON.stringify(t_filtered_bokings);
         console.log(t_filtered_bokings_json);

         localStorage.setItem(this.key, JSON.stringify(t_filtered_bokings));
         
    }

}
