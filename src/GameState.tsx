import { configureStore } from '@reduxjs/toolkit'
import playerNumberReducer from './PlayerNumberSlice.tsx'

export const GameState = configureStore({
    reducer: {
        playerNumber : playerNumberReducer
    }
})

export default GameState;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof GameState.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof GameState.dispatch