import React from "react";

export default props => {
  return (
    <div>
      {props.completed &&
        <div className="success__message">
          Success! Your audio has been replaced
        </div>}
      {props.error &&
        <div className="error__message">
          We couldn't replace your audio. Try uploading new audio again.
        </div>}
    </div>
  );
};
