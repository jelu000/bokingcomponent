
import './App.css';
import JlBokingComp from "./components/JlBokingComp";
import Menybar from './components/huvudmeny/Menybar';
import Menyitem from './components/huvudmeny/Menyitem';

function App() {
  return (
    <div className="App">
      
      <Menybar>
        <Menyitem text="Bokningar" />
        <Menyitem text="Biträden" />
      </Menybar>
      
      <p>Detta är början på ett bokningsprogram för testning.</p>
      <JlBokingComp />
    </div>
  );
}

export default App;
