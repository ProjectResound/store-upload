import React from "react";
import EditFile from "./EditFile";

export default props => {
  return (
    <div className="col s2 audio-actions__container">
      <div className="row">
        <EditFile
          audio={props.audio}
          inEditMode={props.inEditMode}
          onEdit={props.onEdit}
          validForm={props.validForm}
          save={props.save}
        />
      </div>
      <div className="row delete__container" onClick={props.onDelete}>
        <img
          src="/assets/images/icon-delete.png"
          className="trash__icon"
          alt="delete icon"
        />
        Delete this file
      </div>
    </div>
  );
};
