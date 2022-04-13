import React, { useId, useState } from "react";
import { Container, Grid, Button, Typography, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { addDoFirst, removeDoFirst } from "./features/todo/todoSlice";
import { addSchedule, removeSchedule } from "./features/todo/todoScheduleSlice";
import { addDelegate, removeDelegate } from "./features/todo/todoDelegateSlice";
import { addCancel, removeCancel } from "./features/todo/todoCancelSlice";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const todosDoFirst = useSelector((state) => state.todo.doFirst);
  const todosSchedule = useSelector((state) => state.todoSchedule.scheduleTodo);
  const todosDelegate = useSelector((state) => state.todoDelegate.delegateTodo);
  const todosCancel = useSelector((state) => state.todoCancel.cancelTodo);

  let newTodo = text;

  const handleAddDoFirst = (e) => {
    if (text.length > 0) {
      dispatch(addDoFirst({ newTodo: newTodo }));
      setText("");
    }
  };

  const handleSchedule = () => {
    if (text.length > 0) {
      dispatch(addSchedule({ newTodo: newTodo }));
      setText("");
    }
  };

  const handleCancel = (e) => {
    if (text.length > 0) {
      dispatch(addCancel({ newTodo: newTodo }));
      setText("");
    }
  };

  const handleDelegate = () => {
    if (text.length > 0) {
      dispatch(addDelegate({ newTodo: newTodo }));
      setText("");
    }
  };
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;
    console.log("start", start);
    console.log("finish", finish);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Container>
          <Typography variant="h4">Eisenhower Matrix Assignment</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  placeholder="Enter Something..."
                  type="text"
                  className="inputText"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  className="btn"
                  onClick={handleAddDoFirst}
                >
                  Add to: Do First
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn"
                  onClick={handleSchedule}
                >
                  Add to: Schedule
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn"
                  onClick={handleDelegate}
                >
                  Add to: Delegate
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  className="btn"
                  onClick={handleCancel}
                >
                  Add to: Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Card
                color="green"
                title="Do First(Urgent)"
                flagId="doFirst"
                id={uuidv4()}
              />
            </Grid>
            <Grid item xs={6}>
              <Card
                color="blue"
                title="Schedule"
                flagId="schedule"
                id={uuidv4()}
              />
            </Grid>
            <Grid item xs={6}>
              <Card
                color="red"
                title="Delegate"
                flagId="delegate"
                id={uuidv4()}
              />
            </Grid>
            <Grid item xs={6}>
              <Card
                color="orange"
                title="Cancel"
                flagId="cancel"
                id={uuidv4()}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </DragDropContext>
  );
}

export default App;
