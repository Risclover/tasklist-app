import React from "react";

export default function TaskList(props) {
  return <ul className="task-list">{props.children}</ul>;
}
