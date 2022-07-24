import React from "react";

export default function ProjectTitle(props) {
  return (
    <div className="project-title-box" onClick={props.onClick}>
      <h1 className="project-title">{props.activeProject}</h1>
      <input
        onKeyPress={(e) => props.handleProjectInput(e)}
        onBlur={(e) => props.handleProjectBlur(e)}
        type="text"
        className="edit-project-title"
      />
    </div>
  );
}
