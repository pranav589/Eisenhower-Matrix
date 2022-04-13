import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  doFirst: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addDoFirst: (state, action) => {
      let newTodo = {
        id: uuidv4(),
        content: action.payload.newTodo,
      };
      state.doFirst.push(newTodo);
    },
    removeDoFirst: (state, action) => {
      state.doFirst.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDoFirst, removeDoFirst } = todoSlice.actions;

export default todoSlice.reducer;
