import { configureStore } from "@reduxjs/toolkit";
   import { setupListeners } from "@reduxjs/toolkit/query";
   import { rootReducer } from "./rootReducer";
   import { userApi } from "./services/apiSlice";

   export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
   });
   setupListeners(store.dispatch)
   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;