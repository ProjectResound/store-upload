import React from 'react';
import moment from 'moment';

const AudioItem = ({ audioItem }) => {
  const date = new Date(audioItem.created_at).toLocaleDateString();
  const durationInMilliseconds = audioItem.duration * 1000;
  const duration = moment.utc(durationInMilliseconds).format('HH:mm:ss');
  return (
    <tr className="explorer__table__audio-item">
      <td className="explorer__table__audio-item-title">{audioItem.title}</td>
      <td>{audioItem.filename}</td>
      <td className="explorer__table__audio-item-date">{date}</td>
      <td className="explorer__table__audio-item-duration">{duration}</td>
    </tr>
  );
};

module.exports = AudioItem;
