  import { combineReducers } from "@reduxjs/toolkit";
   import { employeeApi } from "../services/employeeApi";

   export const rootReducer = combineReducers({
    [employeeApi.reducerPath]: employeeApi.reducer,
   });

   export type RootState = ReturnType<typeof rootReducer>

