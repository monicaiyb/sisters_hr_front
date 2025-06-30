  import { combineReducers } from "@reduxjs/toolkit";
   import { employeeApi } from "./services/employeeApi";
   import {userApi } from "./services/userApi";

   export const rootReducer = combineReducers({
    [employeeApi.reducerPath]: employeeApi.reducer,
     [userApi.reducerPath]: userApi.reducer,
   });

   export type RootState = ReturnType<typeof rootReducer>

