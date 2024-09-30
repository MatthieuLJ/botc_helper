import React from 'react';
import './App.css';
import GameState from './state/GameState.tsx';
import CheckForSetup from './routing/CheckForSetup.tsx';
import CheckForPlay from './routing/CheckForPlay.tsx';
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
    element: <CheckForPlay />,
    children: [
      {
        path: "",
        lazy: async () => {
          let { TownsquareSetup } = await import("./setup-components/TownsquareSetup.tsx");
          return { Component: TownsquareSetup };
        }
      }
    ]
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
        lazy: async () => {
          let { Playview } = await import("./Playview.tsx");
          return { Component: Playview };
        }
      },
      {
        path: "player/:playerIndex",
        lazy: async () => {
          let { Playerview } = await import("./Playerview.tsx");
          return { Component: Playerview };
        },
      }
    ]
  }
], {
  basename: "/botc-notes/",
});

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
