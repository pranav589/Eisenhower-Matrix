import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  moveAcrossColumn,
  moveWithinColumn,
} from "./redux/reducers/taskReducer";
import Card from "./components/Card/Card";
import AddTodo from "./components/AddTodo/AddTodo";
import { Typography } from "@mui/material";
import "./App.css";

function App() {
  const taskData = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }
    //if drop is in same col
    if (destination.droppableId === source.droppableId) {
      const column = taskData.columns[destination.droppableId];
      const droppedFromIndex = source.index;
      const droppedAtIndex = destination.index;
      let task = column.taskIds[droppedFromIndex];

      let copy = [...column.taskIds];
      copy = copy.filter((t) => t !== task);
      let tasksBefore;
      if (droppedAtIndex === 0) {
        tasksBefore = [];
      } else {
        tasksBefore = copy.slice(0, droppedAtIndex);
      }
      let tasksAfter;
      if (droppedAtIndex === column.taskIds.length) {
        tasksAfter = [];
      } else {
        tasksAfter = copy.slice(droppedAtIndex);
      }
      let newTasks = [...tasksBefore, task, ...tasksAfter];
      dispatch(moveWithinColumn(column.id, newTasks));
      return;
    }
    //if drop is in different col
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;
    const task = taskData.columns[sourceColumnId].taskIds[source.index];

    const sourceColumTaskIds = taskData.columns[sourceColumnId].taskIds;
    const newSourceColumTaskIds = sourceColumTaskIds.filter((t) => t !== task);

    const destinationIndex = destination.index;

    const copyOfDestinationTaskIds = [
      ...taskData.columns[destinationColumnId].taskIds,
    ];

    let tasksBefore;
    if (destinationIndex === 0) {
      tasksBefore = [];
    } else {
      tasksBefore = copyOfDestinationTaskIds.slice(0, destinationIndex);
    }

    let tasksAfter;
    if (
      destinationIndex === taskData.columns[destinationColumnId].taskIds.length
    ) {
      tasksAfter = [];
    } else {
      tasksAfter = copyOfDestinationTaskIds.slice(destinationIndex);
    }

    let newTasks = [...tasksBefore, task, ...tasksAfter];
    dispatch(
      moveAcrossColumn(
        sourceColumnId,
        newSourceColumTaskIds,
        destinationColumnId,
        newTasks
      )
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Typography variant="h4" className="header">
        Eisenhower Matrix Assignment
      </Typography>
      <AddTodo />
      <Card />
    </DragDropContext>
  );
}

export default App;
