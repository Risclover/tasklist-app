import React, { useState } from "react";

var classNames = require("classnames");

export default function Task(props) {
  const importantClasses = classNames({
    importantOn: props.important,
    importantOff: !props.important,
  });

  return (
    <li id={props.id} className="task" onClick={props.onClick}>
      <div className="task-left">
        <input
          id={props.id}
          type="checkbox"
          className="task-done"
          defaultChecked={props.completed}
          onChange={() => props.handleCompleted(props.id, props.project)}
        />
        <div className="task-details">
          <div className="top-details">
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
          {props.dueDate !== "" || props.description !== "" ? (
            <div className="bottom-details">
              {props.dueDate !== "" && props.description === "" ? (
                <span className="duedate">
                  <i className="fa-regular fa-calendar bottom-icon"></i>
                  {props.dueDate}
                </span>
              ) : (
                ""
              )}
              {props.description !== "" && props.dueDate === "" ? (
                <span className="note">
                  <i className="fa-regular fa-note-sticky bottom-icon"></i> Note
                </span>
              ) : (
                ""
              )}
              {props.description !== "" && props.dueDate !== "" ? (
                <span className="both-icons">
                  <span className="duedate">
                    <i className="fa-regular fa-calendar bottom-icon"></i>
                    {props.dueDate}
                  </span>
                  <span className="divider">•</span>
                  <span className="note">
                    <i className="fa-regular fa-note-sticky bottom-icon"></i>{" "}
                    Note
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <button
          className={importantClasses}
          onClick={() => props.handleImportance(props.id)}
        >
          <i className="fa-solid fa-star"></i>
        </button>
      </div>
      <div className="task-right">
        <button
          className="task-btn edit-task-btn"
          onClick={(e) => props.openModal(e)}
        >
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
