import { Typography } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TodoContainer from "../TodoContainer/TodoContainer";

function DropContainer({ column }) {
  return (
    <div>
      <Typography>
        {column?.id?.toUpperCase()} {column?.taskIds?.length}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
            >
              {column?.taskIds.map((taskId, index) => (
                <TodoContainer taskId={taskId} key={taskId} index={index} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default DropContainer;
