import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  delegateTodo: [],
  id: uuidv4(),
};

export const todoDelegateSlice = createSlice({
  name: "todoDelegate",
  initialState,
  reducers: {
    addDelegate: (state, action) => {
      let newTodo = {
        id: uuidv4(),
        content: action.payload.newTodo,
      };
      state.delegateTodo.push(newTodo);
    },
    removeDelegate: (state, action) => {
      state.delegateTodo.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addDelegate, removeDelegate } = todoDelegateSlice.actions;
export default todoDelegateSlice.reducer;
