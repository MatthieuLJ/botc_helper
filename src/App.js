import Counter from './Counter.tsx';
import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import GameState from './game/GameState.tsx';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={GameState}>
      <div className="App">
        <Counter />
        <TownsquareSetup />
      </div>
    </Provider>
  );
}

export default App;
