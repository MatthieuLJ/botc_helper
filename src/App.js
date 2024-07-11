import React from 'react';
import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import Townsquare from './Townsquare.tsx';
import GameState from './game/GameState.tsx';
import Player from './Player.tsx';
import { Provider } from 'react-redux';
import { ScriptProvider } from './game/ScriptContext.tsx';
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
    element: <Townsquare />
  },
  {
    path: "/player/:playerId",
    element: <Player />
  }

]);

function App() {
  return (
    <React.StrictMode>
      <ScriptProvider>
        <Provider store={GameState}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </Provider>
      </ScriptProvider>
    </React.StrictMode>
  );
}

export default App;
