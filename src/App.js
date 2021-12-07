import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Navbar from './components/Navbar/Navbar';
import Dagsavslut from './components/dagsavslut/Dagsavslut';
import Om from './components/Om/Om';
//import Utskrift from './components/dagsavslut/Utskrift';
//<Route path="/utskrift" element={<Utskrift />} exact />

import { BrowserRouter, Routes, Route } from "react-router-dom";

//https://reactrouter.com/docs/en/v6/getting-started/overview

function App() {
  return (
    <div className="App">
      

      
      <BrowserRouter>
      <Navbar />
           
      <Routes>
        
        <Route index element={<JlBokingComp />} exact />
        
        
        <Route path="/dagsavslut" element={<Dagsavslut />} exact />
        <Route path="/om" element={<Om />} exact />
        
         
      </Routes>
      
    </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
