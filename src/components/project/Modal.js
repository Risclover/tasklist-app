import React, { useState } from "react";
import "./modal.css";

export default function Modal(props) {
  return (
    <div className="modal-full">
      <div className="modal-bg" onClick={() => props.closeModal()} />
      <div className="centered">
        <div className="modal">
          <div className="modal-header">
            <h5 className="modal-heading">Edit Task</h5>
            <button className="modal-close" onClick={() => props.closeModal()}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-content">
            <label for="modal-title">Title:</label>
            <input type="text" className="modal-title-input" />
            <label for="modal-description">Description:</label>
            <textarea className="modal-description-input" />
            <label for="modal-duedate" className="modal-duedate">
              Due Date:
            </label>
            <input type="date" className="modal-duedate-input" />
          </div>
          <div className="modal-footer">
            <div className="modal-actions">
              <button
                className="modal-confirm"
                onClick={() => props.submitModal()}
              >
                Submit
              </button>
              <button
                className="modal-cancel"
                onClick={() => props.closeModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
