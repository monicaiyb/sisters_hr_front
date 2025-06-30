
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
export interface Employee {
  id: string;
  name: string;
  email: string;
}
const initialState: Array<Employee> = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@test.com',
    }
]
export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.push(action.payload);
    },
  },
});
export const { addEmployee } =
  employeeSlice.actions;
export const userSelector = (state: RootState) => state.employeeApi;
export default employeeSlice.reducer;