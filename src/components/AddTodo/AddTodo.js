import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/reducers/taskReducer";
import "./AddTodo.css";

function AddTodo() {
  const [todoData, setTodoData] = useState("");
  const [select, setSelect] = useState("doFirst");
  const dispatch = useDispatch();

  const onTaskChange = (e) => {
    setTodoData(e.target.value);
  };

  const onSelectChange = (e) => {
    setSelect(e.target.value);
  };

  const onSubmit = (e) => {
    const content = todoData.trim();

    const columnId = select;
    if (!content) {
      return;
    }
    const matrix = parseInt(localStorage.getItem("matrix-key"));
    localStorage.setItem("matrix-key", matrix + 1);
    setTodoData("");
    setSelect("doFirst");
    dispatch(addTask(`task-${matrix}`, content, columnId));
  };

  return (
    <div className="addTodo">
      <TextField
        value={todoData}
        onChange={onTaskChange}
        placeholder="Enter Todo..."
        className="addTodo__input"
      />
      <Select value={select} onChange={onSelectChange}>
        <MenuItem value="doFirst">Do First</MenuItem>
        <MenuItem value="schedule">Schedule</MenuItem>
        <MenuItem value="delegate">Delegate</MenuItem>
        <MenuItem value="eliminate">Eliminate</MenuItem>
      </Select>
      <Button onClick={onSubmit} variant="contained" className="addTodo__btn">
        Add
      </Button>
    </div>
  );
}

export default AddTodo;
