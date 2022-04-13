import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  cancelTodo: [],
  id: uuidv4(),
};

export const todoCancelSlice = createSlice({
  name: "todoCancel",
  initialState,
  reducers: {
    addCancel: (state, action) => {
      let newTodo = {
        id: uuidv4(),
        content: action.payload.newTodo,
      };
      state.cancelTodo.push(newTodo);
    },
    removeCancel: (state, action) => {
      state.cancelTodo.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCancel, removeCancel } = todoCancelSlice.actions;
export default todoCancelSlice.reducer;
