import React from "react";

export default function ProjectTitle(props) {
  return (
    <div className="project-title-box" onClick={props.onClick}>
      <div className="title-bar">
        <h1 className="project-title">{props.activeProject}</h1>(
        {props.activeProject === "Completed"
          ? props.completedCount
          : props.activeProject === "Important"
          ? props.importantCount
          : props.activeProject === "All"
          ? props.taskCount
          : ""}
        )
      </div>
      <input
        onKeyPress={(e) => props.handleProjectInput(e)}
        onBlur={(e) => props.handleProjectBlur(e)}
        type="text"
        className="edit-project-title"
      />
    </div>
  );
}
