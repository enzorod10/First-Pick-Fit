import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userApi } from './redux/features/userFeatures/userApi'
import userStatusReducer from './redux/features/userFeatures/userSlice';

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false }).concat(userApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch