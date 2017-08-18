import React from "react";

export default props => {
  return (
    <div className="row">
      {!props.editing &&
        <h1 className="audio-page__title">
          {props.title}
        </h1>}
      {props.editing &&
        <div>
          <input
            className={
              props.validTitle
                ? "title__input"
                : "title__input title__input--error"
            }
            type="text"
            name="title"
            value={props.value}
            onChange={props.onTitleChange}
          />
          <div className={props.validTitle ? "hidden" : "audio__alert"}>
            Minimum length should be {props.MAX_CHAR_LENGTH} characters.
          </div>
        </div>}
    </div>
  );
};
