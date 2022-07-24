import React from "react";

export default function InputTask(props) {
  return (
    <div className="input-task">
      <input
        type="text"
        className="type-task"
        disabled={props.disabled}
        placeholder={props.activeProject ? "Cannot add task right now" : ""}
      />
      <button
        className="add-task"
        onClick={props.onClick}
        disabled={props.diabled}
      >
        Add Task
      </button>
    </div>
  );
}
