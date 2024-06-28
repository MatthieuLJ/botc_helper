import Counter from './Counter.tsx';
import { useState } from 'react';
import './App.css';
import Townsquare from './Townsquare.tsx';

function App() {
  const [numPlayers, setNumPlayers] = useState(3);

  return (
    <div className="App">
      <Counter minimum={1} maximum={20} onSet={setNumPlayers}/>
      <Townsquare numPlayers={numPlayers}/>
    </div>
  );
}

export default App;
