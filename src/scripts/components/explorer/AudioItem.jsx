import React from "react";
import { Link } from "react-router-dom";
import {
  getCreatedAt,
  getDuration,
  generateUrl
} from "../../services/audio-tools";

export default ({ audioItem, isAppending, index }) => {
  let animationClass = "";
  if (isAppending && index === 0) {
    animationClass = "explorer__table__audio-item--blind-down";
  }
  return (
    <div className={`explorer__table__audio-item row ${animationClass}`}>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-title col s4">
        <Link to={generateUrl(audioItem)} className="audio__link">
          {audioItem.title}
        </Link>
      </div>
      <div className="explorer__table__audio-item__property col s4">
        <Link to={generateUrl(audioItem)} className="audio__link">
          {audioItem.filename}
        </Link>
      </div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-date col s2">
        {getCreatedAt(audioItem)}
      </div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-duration col s2">
        {getDuration(audioItem)}
      </div>
    </div>
  );
};
