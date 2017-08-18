import React from "react";
import Modal from "react-modal";

export default props => {
  return (
    <Modal
      isOpen={props.showModal}
      contentLabel="Delete Modal"
      onRequestClose={props.handleCloseModal}
      className="modal"
      overlayClassName="modal__overlay"
    >
      Are you sure you want to permanently delete these files?
      <div className="row">
        <ul>
          {props.fileItems}
        </ul>
      </div>
      <div className="row">
        <div className="delete__yes" onClick={props.handleDeleteAudio}>
          Delete
        </div>
        <div className="delete__no" onClick={props.handleCloseModal}>
          No
        </div>
      </div>
    </Modal>
  );
};
