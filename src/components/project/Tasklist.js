import React from "react";

export default function TaskList(props) {
  return (
    <div className="tasklist-box">
      <ul className="task-list">{props.children}</ul>
    </div>
  );
}
