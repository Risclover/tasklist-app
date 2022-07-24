import React from "react";

export default function Important(props) {
  return (
    <button className="important" onClick={props.onClick} id={props.id}>
      {props.isStar === true ? (
        <i className="fa-solid fa-star star" />
      ) : (
        <i className="fa-solid fa-star no-star" />
      )}
    </button>
  );
}
