import React from 'react';
import './App.css';
import TownsquareSetup from './TownsquareSetup.tsx';
import Playview from './Playview.tsx';
import GameState from './state/GameState.tsx';
import Playerview from './Playerview.tsx';
import CheckForSetup from './components/CheckForSetup.tsx';
import { Provider } from 'react-redux';
import { ScriptProvider } from './state/ScriptContext.tsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const top_level_router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/setup" replace />,
  },
  {
    path: "/setup",
    element: <TownsquareSetup />,
  },
  {
    path: "/play",
    element: <CheckForSetup />,
    children: [

      {
        path: "",
        element: <Navigate to="/play/townsquare" replace />
      },
      {
        path: "townsquare",
        element: <Playview />
      },
      {
        path: "player/:playerIndex",
        element: <Playerview />
      }
    ]
  }
]);

function App() {
  return (
    <React.StrictMode>
      <Provider store={GameState}>
        <ScriptProvider>
          <div className="App">
            <RouterProvider router={top_level_router}>
            </RouterProvider>
          </div>
        </ScriptProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;