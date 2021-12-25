//import Bokning from "./Bokning";
import Treatment from "./behandlingar/Treatment";
import ProductDaySale from "./productsdaysales/ProductDaySale";
//LocalStorageHandler simulerar Databas för åtkomst REST api

export default class LocalStorageHandler {
    constructor(){
        this.key = 'bokningar';
        this.key_products = 'produkter';
        this.key_productdaysale = 'productdaysale';
        
        
        //För Simuler Databas med behandlingar-----------------------------------------------
        let treatment_array = [{t_id: "1", t_name: "Klippning", t_time: "45", t_price: "600"}];
        
        let t_treat = new Treatment("2", "Färgning", "60", "1000" );
        treatment_array.push(t_treat);
                
        treatment_array.push(new Treatment("3", "Slingor", "75", "1200" ));
        treatment_array.push(new Treatment("4", "Klippning & Färgning", "120", "1600" ));
        
        this.global_treatment_array = treatment_array;//Databas med behandlingar
    
    }

//BOKINGS------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------    

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
//TREATMENTS-------------------------------------------------------------------------
//-----------------------------------------------------------------------------------

    getTreatments(){
        

       // console.log(`getTreatments(): ${JSON.stringify(treatment_array)}`);

        return this.global_treatment_array;
        
    }
//GETSAILDAY---------------------------------------------------------------------------
//----------------------------------------------------------------------------

    getSailsDay(t_datum){

        let t_products = this.getProductDaySales(t_datum);

        //let t_products = []; 
        
        /*let t_product_1 = {
            id: "1",
            productname: "hjärtligt shampo",
            pris: "140",
            swish: false
        }
        let t_product_2 = {
            id: "2",
            productname: "hjärtligt spray",
            pris: "170",
            swish: true
        }

        t_products.push(t_product_1);
        t_products.push(t_product_2);
        */
        return t_products;
    }
//PRODUCTS---------------------------------------------------------------------------
//-----------------------------------------------------------------------
    sortProductName = (element_a, element_b) => {
        let ea = element_a.p_name.toLowerCase();
        let eb = element_b.p_name.toLowerCase();


        if (ea < eb){
          return -1;
        }
        if (ea > eb){
          return 1;
        }
        return 0;        
      }
    
    addProdukt(new_produkt){
        let produkts_string = "[]";
        let produkt_array = [];

        //Add id to new_product
        let p_id = Date.now();
        new_produkt.p_id = p_id.toString();
        
        if ( localStorage.getItem(this.key_products) !== null ){
            produkts_string = localStorage.getItem(this.key_products);

        }

        try {
            console.log(`addProduct ${produkts_string} `)
            produkt_array = JSON.parse(produkts_string);
            console.log(`addProduct ${JSON.stringify(produkt_array)} `)
            produkt_array.push(new_produkt);
            localStorage.setItem(this.key_products, JSON.stringify(produkt_array));

        }
        catch (e){
            console.log(e);
        }

        produkt_array.sort(this.sortProductName);
        
        return produkt_array;
    }

    getProducts(){
        let produkts_string = "[]";
        let produkt_array = [];

        if ( localStorage.getItem(this.key_products) !== null ){
            produkts_string = localStorage.getItem(this.key_products);

        }

        try {
           produkt_array = JSON.parse(produkts_string);
        }
        catch (e){
            console.log(e);
        }

        produkt_array.sort(this.sortProductName);
        
        return produkt_array;

    }

    getProduct(p_id){

        let produkts_string = "[]";
        let produkt_array = [];

        if ( localStorage.getItem(this.key_products) !== null ){
            produkts_string = localStorage.getItem(this.key_products);

        }

        try {
           produkt_array = JSON.parse(produkts_string);
        }
        catch (e){
            console.log(e);
        }
         //Hitta  index nummer för vald produkt     
         let t_index = produkt_array.findIndex((obj => obj.p_id === p_id));

         //console.log(`Uppdatera index plats: ${t_index}`);
         //Tilldelar index i array till de uppdaterade boknings objektet
         return produkt_array[t_index];

    }
    deleteProduct(p_id){
         //Hämtar array från LocalStorage med produkter
         let products_json = localStorage.getItem(this.key_products);
         let product_array_obj = JSON.parse(products_json);

         console.log(`dP= ${typeof p_id}`);

         product_array_obj.map( (obj) => console.log(`${typeof obj.p_id}`))

         let t_filtered_products = product_array_obj.filter( prod_obj =>  prod_obj.p_id !== p_id);

                //let t_filtered_bokings_json = JSON.stringify(t_filtered_bokings);
                console.log(`i DELprod= ${JSON.stringify(t_filtered_products)}`);

         localStorage.setItem(this.key_products, JSON.stringify(t_filtered_products));
         
        return  t_filtered_products;
    }

    updateProduct(p_id, p_name, p_size, p_price ){
        let products_json = localStorage.getItem(this.key_products);
         let product_array_obj = JSON.parse(products_json);

        //Hitta  index nummer för valt produkt-id     
        let t_index = product_array_obj.findIndex((obj => obj.p_id === p_id));

        
        //Tilldelar index i array till de uppdaterade produkt objektet
        product_array_obj[t_index].p_name = p_name;
        product_array_obj[t_index].p_size = p_size;
        product_array_obj[t_index].p_price = p_price;
        //Sparar ner de till LocalStorage
        localStorage.setItem(this.key_products, JSON.stringify(product_array_obj));
        //sorterar
        product_array_obj.sort(this.sortProductName);
        //returnerar den uppdaterade produkt listan
        return product_array_obj;


    }
//PRODUCTDAYSALES-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//ProductDaySale
//IN: babs, transactiondate, Product
//UT: array ProductDaySale
//-----------------------------------------------------------------------------------------------------
    sortProductSaleArray = (element_a, element_b) => {
        let ea = element_a.pd_name.toLowerCase();
        let eb = element_b.pd_name.toLowerCase();

        if (ea < eb){
        return -1;
        }
        if (ea > eb){
        return 1;
        }
        return 0;    
    }

    getProductDaySales(datum){

        let productday_string = "[]";
        let productday_array = [];

        let productday_array_date = [];    
        
        if ( localStorage.getItem(this.key_productdaysale) !== null ){
            productday_string = localStorage.getItem(this.key_productdaysale);
        }

        try {
            //console.log(`addProductDaySale ${produkts_string} `)
            productday_array = productday_array = JSON.parse(productday_string);
            //console.log(`addProduct ${JSON.stringify(produkt_array)} `)
            productday_array_date = productday_array.filter( (dayobj) => {
                return datum === dayobj.pd_date;
            });
        }
        catch (e){
            console.log(e);
        }
        //Sorterar på namn------------------------------------------------------------------------------------------
    //productday_array_date.sort(this.sortProductSaleArray);
        
        return productday_array_date;
    }


    addProductDaySale(temp_babs, temp_date, new_product){
        let productday_string = "[]";
        let productday_array = [];

        //Add id to new_product
        let temp_id = Date.now();
        let pd_id = temp_id.toString();

        let new_productdaysale = new ProductDaySale(temp_date, pd_id, new_product.p_name, new_product.p_size, new_product.p_price, temp_babs, new_product.p_id );

        
        if ( localStorage.getItem(this.key_productdaysale) !== null ){
            productday_string = localStorage.getItem(this.key_productdaysale);

        }

        try {


            //console.log(`addProductDaySale ${produkts_string} `)
            productday_array = JSON.parse(productday_string);
            //console.log(`addProduct ${JSON.stringify(produkt_array)} `)
            productday_array.push(new_productdaysale);
            localStorage.setItem(this.key_productdaysale, JSON.stringify(productday_array));

        }
        catch (e){
            console.log(e);
        }

        
        
        return this.getProductDaySales(temp_date);
    }

    updateDaySaleProduct(pd_id, pd_name, pd_size, pd_price, pd_babs){
        let productday_string = "[]";
        let productday_array = [];

        //let productday_array_date = [];    
        
        try {
            productday_string = localStorage.getItem(this.key_productdaysale);
            productday_array = JSON.parse(productday_string);
            //Hitta  index nummer för valt produkt-id     
            let t_index = productday_array.findIndex((obj => obj.pd_id === pd_id));

        
            //Tilldelar index i array till de uppdaterade produkt objektet
            productday_array[t_index].pd_name = pd_name;
            productday_array[t_index].pd_size = pd_size;
            productday_array[t_index].pd_price = pd_price;
            productday_array[t_index].pd_babs = pd_babs;
            //Sparar ner de till LocalStorage
            localStorage.setItem(this.key_productdaysale, JSON.stringify(productday_array));
        }
        catch (e){
            console.log(e);
        }

        return productday_array;

    }

    getDaySaleProduct(pd_id){

        //console.log(`getDaySaleProduct: ${pd_id}`)

        let produktsDaySale_string = "[]";
        let produktDaySale_array = [];

        if ( localStorage.getItem(this.key_productdaysale) !== null ){
            produktsDaySale_string = localStorage.getItem(this.key_productdaysale);
            //console.log(produktsDaySale_string)
        }

        try {
           produktDaySale_array = JSON.parse(produktsDaySale_string);
        }
        catch (e){
            console.log(e);
        }

        //console.log(`Uppdatera index plats: ${produktDaySale_array.length}`);
        //Hitta  index nummer för vald produkt     
        let t_index = produktDaySale_array.findIndex((obj => obj.pd_id === pd_id));
       

        //console.log(`Uppdatera index plats: ${t_index}`);
        //Tilldelar index i array till de uppdaterade boknings objektet
         return produktDaySale_array[t_index];

    }

    delProductDaySale(pd_id){
        console.log(`pd_id ${pd_id}`);

        let produktsDaySale_string = "[]";
        let produktDaySale_array = [];

        if ( localStorage.getItem(this.key_productdaysale) !== null ){
            produktsDaySale_string = localStorage.getItem(this.key_productdaysale);
            console.log(produktsDaySale_string)
        }

        try {
            produktDaySale_array = JSON.parse(produktsDaySale_string);
            produktDaySale_array = produktDaySale_array.filter( prodsale_obj =>  prodsale_obj.pd_id !== pd_id);
             //Sparar till LocalStorage
            localStorage.setItem(this.key_productdaysale, JSON.stringify(produktDaySale_array));

        }
         catch (e){
             console.log(e);
         }
         
         return produktDaySale_array;
    }

    

}
