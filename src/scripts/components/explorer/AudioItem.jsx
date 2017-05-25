import React from 'react';

const AudioItem = ({ audioItem }) => {
  const date = new Date(audioItem.created_at).toLocaleDateString();
  return (
    <tr className="explorer__table__audio-item">
      <td className="explorer__table__audio-item-title">{audioItem.title}</td>
      <td>{audioItem.filename}</td>
      <td>{date}</td>
      <td>{audioItem.duration}</td>
    </tr>
  );
};

module.exports = AudioItem;
