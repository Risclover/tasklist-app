import React from "react";

export default function TopNavItem(props) {
  return (
    <li className="nav-item" onClick={props.onClick}>
      {props.item}
    </li>
  );
}
