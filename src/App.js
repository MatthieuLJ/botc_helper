import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import GameState from './game/GameState.tsx';
import { Provider } from 'react-redux';
import { ScriptProvider } from './game/ScriptContext.tsx'

function App() {
  return (
    <ScriptProvider>
      <Provider store={GameState}>
        <div className="App">
          <TownsquareSetup />
        </div>
      </Provider>
    </ScriptProvider>
  );
}

export default App;
