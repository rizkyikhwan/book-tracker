import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookmarksSlice from "./bookmarks/bookmarksSlice";
import { apiSlice } from "./api/apiSlice";

const reducers = combineReducers({
  bookmarks: bookmarksSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch