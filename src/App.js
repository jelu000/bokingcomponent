import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Navbar from './components/Navbar/Navbar';
import Dagsavslut from './components/dagsavslut/Dagsavslut';
import Om from './components/Om/Om';
import Utskrift from './components/dagsavslut/Utskrift';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
           
      <Routes>
        <Route path="/" element={<JlBokingComp />} exact />
        <Route path="/dagsavslut" element={<Dagsavslut />} exact />
        <Route path="/om" element={<Om />} exact />
        <Route path="/utskrift" element={<Utskrift />} exact />
      </Routes>
    
    </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
