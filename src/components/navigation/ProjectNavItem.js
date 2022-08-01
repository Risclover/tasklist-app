import React from "react";

export default function ProjectNavItem(props) {
  return (
    <li className="project-nav-item" onClick={props.handleProjectClick}>
      <div>
        <input
          type="text"
          className="type-project"
          placeholder="i.e. Summer Chores"
          ref={(input) => input && input.focus()}
          onKeyPress={props.handleProjectTitle}
          onBlur={props.handleProjectTitleBlur}
        />
        <span className="set-project"></span>
      </div>
      {props.index > 0 ? (
        <button className="project-delete" onClick={props.deleteProject}>
          <i className="fa-solid fa-trash"></i>
        </button>
      ) : (
        ""
      )}
    </li>
  );
}
