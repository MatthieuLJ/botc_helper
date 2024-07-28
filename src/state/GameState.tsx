import { combineReducers, configureStore } from '@reduxjs/toolkit';
import debounce from "debounce";
import playerReducer from './PlayersSlice.tsx';

const state_version = 1;

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        localStorage.setItem("state_version", String(state_version));
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const storageVersion = Number(localStorage.getItem("state_version"));
        if (storageVersion !== state_version) {
            return undefined;
        }
    }
    catch (e) {
        return undefined;
    }
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const GameState = configureStore({
    reducer: combineReducers({
        players: playerReducer,
    }),
    preloadedState: loadFromLocalStorage()
}
);

GameState.subscribe(debounce(() => saveToLocalStorage(GameState.getState()), 2000));

export default GameState;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof GameState.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof GameState.dispatch;