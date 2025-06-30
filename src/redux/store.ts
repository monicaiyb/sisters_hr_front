
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import {rootReducer} from "./rootReducer";


// const store = configureStore({
//   reducer: rootReducer,
//    middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             immutableCheck: false,
//             serializableCheck: false
//         })
// })

// Define the `makeStore` function
export const makeStore = () => {
  return configureStore({
     reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()       
  });
};
// Create the store using the `makeStore` function
export const store = makeStore();
// Now you can use the `store` instance to infer the `RootState`
export type RootState = ReturnType<typeof store.getState>;

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
export default store;