//import Bokning from "./Bokning";


export default class LocalStorageHandler {
    constructor(){
        this.key = 'bokningar';
    
    }

    getBokingsDay(t_datum){

    
        let bokingArray = JSON.parse(localStorage.getItem(this.key));
        
        let bokingDayArray = bokingArray.filter( (t_index) =>{ return t_index.t_date === t_datum });
        //let bokingDayArray = bokingArray.filter(function (t_index) { return t_index.datum === t_datum; });

        
        //console.log(`LocalStorageHandler.getBokingDay ${JSON.stringify(bokingDayArray)}`);

        return bokingDayArray;
    }

    
    addBoking(new_boking_obj){

        
        //Hämtar array från LocalStorage med bokningar
        let bokingArray = localStorage.getItem(this.key);
        console.log(`LocalStorage.addBoking: ${bokingArray}`);
        let bokingArrayObjects = JSON.parse(bokingArray);
        //Lägger till de nya bokningsobjektet till arrayem
        bokingArrayObjects.push(new_boking_obj); 
        //console.log(`Class LoacalStorageHandler lägger till: ${new_boking_obj}`);
        //Sparar ner de till LocalStorage
        localStorage.setItem(this.key, JSON.stringify(bokingArrayObjects));

        return this.getBokingsDay(new_boking_obj.t_date);

    }

    updateBoking(id, new_boking_obj){
        
        //Hämtar array från LocalStorage med bokningar
        let bokingArray = localStorage.getItem(this.key);

        //Hitta  index nummer för valt boknings-id     
        let t_index = bokingArray.findIndex((obj => obj.id === id));
        //Tilldelar index i array till de nya bokning objektet
        bokingArray[t_index] = new_boking_obj;
        //Sparar ner de till LocalStorage
        localStorage.setItem('bokningar', JSON.stringify(this.state.bokingArray));


    }
    deleteBoking(id){

    }

}
