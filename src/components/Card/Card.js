import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";
import "./Card.css";

function Card({ color, title, flagId, id }) {
  const todosDoFirst = useSelector((state) => state.todo.doFirst);
  const todosSchedule = useSelector((state) => state.todoSchedule.scheduleTodo);
  const todosDelegate = useSelector((state) => state.todoDelegate.delegateTodo);
  const todosCancel = useSelector((state) => state.todoCancel.cancelTodo);

  const todosFirstLength = todosDoFirst.length;
  const todosScheduleLength = todosSchedule.length;
  const todosDelegateLength = todosDelegate.length;
  const todosCancelLength = todosCancel.length;

  return (
    <div className="card__container" style={{ backgroundColor: color }}>
      {flagId === "doFirst" && (
        <div>
          <div className="card__title">
            {title} Count-{todosFirstLength}
          </div>
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  className="card__content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todosDoFirst?.map((todo, index) => (
                    <Todo todo={todo} index={index} key={todo.id} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
      {flagId === "schedule" && (
        <div>
          <div className="card__title">
            {title} Count-{todosScheduleLength}
          </div>
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  className="card__content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todosSchedule?.map((todo, index) => (
                    <Todo todo={todo} index={index} key={todo.id} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}

      {flagId === "delegate" && (
        <div>
          <div className="card__title">
            {title} Count-{todosDelegateLength}
          </div>
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  className="card__content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todosDelegate?.map((todo, index) => (
                    <Todo todo={todo} index={index} key={todo.id} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
      {flagId === "cancel" && (
        <div>
          <div className="card__title">
            {title} Count-{todosCancelLength}
          </div>
          <Droppable droppableId={id}>
            {(provided, snapshot) => {
              return (
                <div
                  className="card__content"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todosCancel?.map((todo, index) => (
                    <Todo todo={todo} index={index} key={todo.id} />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </div>
  );
}

export default Card;
