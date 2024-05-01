import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";
import jobSlice from "./slices/job-slice";

const rootReducer = combineReducers({
  [myApi.reducerPath]: myApi.reducer,
  job: jobSlice,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
  // devTools: isDev && devToolsExtension, // Pass the devTools option here
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
