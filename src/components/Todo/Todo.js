import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Todo({ todo, index }) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="card__content__item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {todo.content}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Todo;
