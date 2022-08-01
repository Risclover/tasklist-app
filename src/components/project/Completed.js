import React from "react";

export default function Completed(props) {
  const handleCompleted = () => {
    const rightArrow = document.querySelector(".completed-closed");
    const downArrow = document.querySelector(".completed-open");
    const completedList = document.querySelector(".completed-list");

    if (rightArrow.style.display === "inline-block") {
      rightArrow.style.display = "none";
      downArrow.style.display = "inline-block";
      completedList.style.display = "block";
    } else {
      rightArrow.style.display = "inline-block";
      downArrow.style.display = "none";
      completedList.style.display = "none";
    }
  };
  return (
    <div className="completed-box">
      <div className="completed-title" onClick={handleCompleted}>
        <i className="fa-solid fa-chevron-right completed-closed"></i>
        <i className="fa-solid fa-chevron-down completed-open"></i>
        <h2>Completed</h2>
        <span className="completed-count">{props.count}</span>
      </div>
      <ul className="completed-list completed">{props.children}</ul>
    </div>
  );
}
