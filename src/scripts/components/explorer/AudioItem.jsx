import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import audioUrl from '../../services/url-generator';

export default ({ audioItem, isAppending, index }) => {
  const date = new Date(audioItem.created_at).toLocaleDateString();
  const durationInMilliseconds = audioItem.duration * 1000;
  const duration = moment.utc(durationInMilliseconds).format('HH:mm:ss');
  let animationClass = '';
  if (isAppending && index === 0) {
    animationClass = 'explorer__table__audio-item--blind-down';
  }
  return (
    <Link to={audioUrl(audioItem)} className={`explorer__table__audio-item row ${animationClass}`}>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-title col s3">{audioItem.title}
      </div>
      <div className="explorer__table__audio-item__property col s3">{audioItem.filename}</div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-date col s3">{date}</div>
      <div className="explorer__table__audio-item__property explorer__table__audio-item-duration col s3">{duration}</div>
    </Link>
  );
};
