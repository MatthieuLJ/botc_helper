import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './PlayersSlice.tsx'

export const GameState = configureStore({
    reducer: {
        players : playerReducer,
    }
})

export default GameState;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof GameState.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof GameState.dispatch