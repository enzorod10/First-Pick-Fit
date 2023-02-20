import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from './redux/features/auth/authApi'
import { userApi } from './redux/features/user/userApi'
import userStatusReducer from './redux/features/user/userSlice';

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false }).concat(authApi.middleware, userApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch