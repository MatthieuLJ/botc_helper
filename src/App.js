import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import GameState from './game/GameState.tsx';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={GameState}>
      <div className="App">
        <TownsquareSetup />
      </div>
    </Provider>
  );
}

export default App;
