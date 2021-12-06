import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Navbar from './components/Navbar/Navbar';
import Dagsavslut from './components/dagsavslut/Dagsavslut';
import Om from './components/Om/Om';
//import Utskrift from './components/dagsavslut/Utskrift';
//<Route path="/utskrift" element={<Utskrift />} exact />

import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

//https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md

function App() {
  return (
    <div className="App">
      

      
      <BrowserRouter>
      <Navbar />
           
      <Routes>
        <Route path="/" element={<JlBokingComp />} exact />
        <Route path="/dagsavslut" element={<Dagsavslut />} exact />
        <Route path="/om" element={<Om />} exact />
        
         
      </Routes>
      
    </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
