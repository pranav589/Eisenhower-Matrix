import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import todoScheduleReducer from "../features/todo/todoScheduleSlice";
import todoDelegateReducer from "../features/todo/todoDelegateSlice";
import todoCancelReducer from "../features/todo/todoCancelSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  todo: todoReducer,
  todoSchedule: todoScheduleReducer,
  todoCancel: todoCancelReducer,
  todoDelegate: todoDelegateReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
