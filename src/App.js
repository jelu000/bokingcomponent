import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Navbar from './components/Navbar/Navbar';
import Dagsavslut from './components/dagsavslut/Dagsavslut';
import Om from './components/Om/Om';
import Products from './components/produkter/Products'; 
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
        
        <Route path="/" element={<JlBokingComp />}  />
        
        
        <Route path="/dagsavslut" element={<Dagsavslut />} />
        <Route path="/produkter" element={<Products />}  />
        <Route path="/om" element={<Om />}  />

        
         
      </Routes>
      
    </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
