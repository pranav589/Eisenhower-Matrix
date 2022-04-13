import { combineReducers, createStore } from "redux";
import taskReducer from "./reducers/taskReducer";

const reducer = combineReducers({
  task: taskReducer,
});

const store = createStore(reducer);

function persistLocalStorage() {
  const state = store.getState();
  localStorage.setItem("matrixData", JSON.stringify(state.task));
}
store.subscribe(persistLocalStorage);

export default store;
