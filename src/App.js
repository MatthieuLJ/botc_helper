import React from 'react';
import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import Playview from './Playview.tsx';
import GameState from './state/GameState.tsx';
import Playerview from './components/Playerview.tsx';
import { Provider } from 'react-redux';
import { ScriptProvider } from './state/ScriptContext.tsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/setup" replace />,
  },
  {
    path: "/setup",
    element: <TownsquareSetup />,
  },
  {
    path: "/play",
    element: <Playview />
  },
  {
    path: "/player/:playerIndex",
    element: <Playerview />
  }

]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={GameState}>
        <ScriptProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </ScriptProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
