import React from "react";
import Completed from "./Completed";

export default function Task(props) {
  return (
    <li className="task" onClick={props.onClick}>
      <div className="task-left">
        <Completed onClick={() => props.handleCompleted()} />
        <span className="task-title" onClick={(e) => props.editTask(e)}>
          {props.title}
        </span>
        <input
          type="text"
          className="task-title-edit"
          ref={(input) => input && input.focus()}
          onKeyPress={(e) => props.handleTaskInput(e, props.id)}
          onBlur={(e) => props.handleInputBlur(e, props.id)}
        />
      </div>
      <div className="task-right">
        <button
          className="task-btn"
          onClick={() => props.handleImportance(props.id)}
        >
          <i className="fa-solid fa-star"></i>
        </button>
        <button className="task-btn edit-task-btn">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          className="task-btn delete-task-btn"
          onClick={() => props.deleteTask(props.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  );
}
