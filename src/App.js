import Counter from './Counter.tsx';
import './App.css';

function App() {
  const logging = (value) => { console.log(`new value ${value}`);}
  return (
    <div className="App">
      <Counter minimum={1} maximum={20} onSet={logging}/>
    </div>
  );
}

export default App;
