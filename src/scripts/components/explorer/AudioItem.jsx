import React from 'react';

const AudioItem = ({ audioItem }) => {
  const date = new Date(audioItem.created_at).toLocaleDateString();
  return (
    <tr>
      <td className="explorer__table-body__title">{audioItem.title}</td>
      <td>{audioItem.filename}</td>
      <td>{date}</td>
      <td>{audioItem.duration}</td>
    </tr>
  );
};

module.exports = AudioItem;
