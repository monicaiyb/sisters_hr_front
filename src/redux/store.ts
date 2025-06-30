import { configureStore, Tuple  } from "@reduxjs/toolkit";

import {rootReducer} from "./rootReducer";


const store = configureStore({
  reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
})



export type AppDispatch = typeof store.dispatch;
export default store;