import React from "react";
import { useSelector } from "react-redux";
import DropContainer from "../DropContainer/DropContainer";
import "./Card.css";

function Card() {
  const taskData = useSelector((state) => state.task);
  return (
    <div className="card__container">
      <div className="card__contain">
        <div className="card__card green">
          <DropContainer column={taskData.columns.doFirst} />
        </div>
        <div className="card__card blue">
          <DropContainer column={taskData.columns.schedule} />
        </div>
      </div>

      <div className="card__contain">
        <div className="card__card red">
          <DropContainer column={taskData.columns.delegate} />
        </div>
        <div className="card__card orange">
          <DropContainer column={taskData.columns.eliminate} />
        </div>
      </div>
    </div>
  );
}

export default Card;
