import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";

function TodoContainer({ taskId, index }) {
  const taskData = useSelector((state) => state.task.tasks[taskId]);

  return (
    <Draggable draggableId={taskData.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Todo content={taskData.content} />
          </div>
        );
      }}
    </Draggable>
  );
}

export default TodoContainer;
