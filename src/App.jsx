import React, { lazy, Suspense } from 'react';
import './App.css';
import GameState from './state/GameState.tsx';
import CheckForSetup from './routing/CheckForSetup.tsx';
import CheckForPlay from './routing/CheckForPlay.tsx';
import { Provider } from 'react-redux';
import { ScriptProvider } from './state/ScriptContext.tsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const TownsquareSetup = lazy(() => import('./setup-components/TownsquareSetup.tsx'));
const Playview = lazy(() => import('./Playview.tsx'));
const Playerview = lazy(() => import('./Playerview.tsx'));
const Timeline = lazy(() => import('./Timeline.tsx'));

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
        element:
          <Suspense fallback={<div>Loading...</div>}>
            <TownsquareSetup />
          </Suspense>
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
        element:
          <Suspense fallback={<div>Loading...</div>}>
            <Playview />
          </Suspense>
      },
      {
        path: "player/:playerIndex",
        element:
          <Suspense fallback={<div>Loading...</div>}>
            <Playerview />
          </Suspense>
      },
      {
        path: "timeline",
        element:
          <Suspense fallback={<div>Loading...</div>}>
            <Timeline />
          </Suspense>
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
