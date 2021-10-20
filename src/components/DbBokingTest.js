//import Bokning from './Bokning';

export default class DbBokingTest {
  constructor() {

  }

  getDayBokings(arraybokningar, datumet){

    let result = arraybokningar.filter( function(boking){
      return boking.datum === datumet
    });

    return result;
  }
}
