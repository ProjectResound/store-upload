import React from 'react';
import { Link } from 'react-router-dom';
import { getCreatedAt, getDuration, generateUrl } from '../../services/audio-tools';

export default ({ audioItem, isAppending, index }) => {
  let animationClass = '';
  if (isAppending && index === 0) {
    animationClass = 'explorer__table__audio-item--blind-down';
  }
  return (
    <Link to={generateUrl(audioItem)} className={`explorer__table__audio-item row ${animationClass}`}>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-title col s3">{audioItem.title}
      </div>
      <div className="explorer__table__audio-item__property col s3">{audioItem.filename}</div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-date col s3">
        {getCreatedAt(audioItem)}
      </div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-duration col s3">
        {getDuration(audioItem)}
      </div>
    </Link>
  );
};
