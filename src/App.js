import './App.scss';
import { Windbnb } from './components/Windbnb/Windbnb';
import json from './stays.json'



function App() {
  

  return (
    <div className="App" >
      <Windbnb {...{json}}/>
    </div>
  );
}

export default App;
