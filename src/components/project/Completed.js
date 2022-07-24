import React from "react";

export default function Completed(props) {
  return (
    <div className="completed">
      <input type="checkbox" onClick={props.onClick} />
    </div>
  );
}
