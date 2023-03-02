import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from './redux/features/auth/authApi'
import { exerciseApi } from './redux/features/exercise/exerciseApi'
import { workoutApi } from './redux/features/workout/workoutApi'
import { userApi } from './redux/features/userApi/userApi'
import { calendarApi } from './redux/features/calendar/calendarApi'
import userStatusReducer from './redux/features/user/userSlice';
import calendarStatusReducer from './redux/features/calendar/calendarSlice';

export const store = configureStore({
  reducer: {
    userStatus: userStatusReducer,
    calendarStatus: calendarStatusReducer,
    [authApi.reducerPath]: authApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [workoutApi.reducerPath]: workoutApi.reducer,
    [calendarApi.reducerPath]: calendarApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware( { serializableCheck: false }).concat(authApi.middleware, exerciseApi.middleware, workoutApi.middleware, calendarApi.middleware, userApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch