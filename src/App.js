import Counter from './Counter.tsx';
import './App.css';
import Townsquare from './Townsquare.tsx';
import GameState from './GameState.tsx';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={GameState}>
    <div className="App">
      <Counter/>
      <Townsquare/>
    </div>
    </Provider>
  );
}

export default App;
