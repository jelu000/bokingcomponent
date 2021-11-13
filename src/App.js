import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Navbar from './components/Navbar/Navbar';
import Dagsavslut from './components/dagsavslut/Dagsavslut';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
           
      <Routes>
        <Route path="/" element={<JlBokingComp />} exact />
        <Route path="/dagsavslut" element={<Dagsavslut />} exact />
      </Routes>
    
    </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
