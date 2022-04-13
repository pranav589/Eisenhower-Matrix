import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  scheduleTodo: [],
  id: uuidv4(),
};

export const todoScheduleSlice = createSlice({
  name: "todoSchedule",
  initialState,
  reducers: {
    addSchedule: (state, action) => {
      let newTodo = {
        id: uuidv4(),
        content: action.payload.newTodo,
      };

      state.scheduleTodo.push(newTodo);
    },
    removeSchedule: (state, action) => {
      state.scheduleTodo.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addSchedule, removeSchedule } = todoScheduleSlice.actions;
export default todoScheduleSlice.reducer;
