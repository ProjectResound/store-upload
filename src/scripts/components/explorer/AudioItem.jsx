import React from 'react';

const AudioItem = ({ audioItem }) => {
  const date = new Date(audioItem.created_at).toLocaleDateString();
  const fileData = JSON.parse(audioItem.file_data);
  return (
    <tr>
      <td className="explorer__table-body__title">{audioItem.title}</td>
      <td>{audioItem.filename}</td>
      <td>{date}</td>
      <td>{fileData ? fileData.metadata.size : 'N/A'}</td>
    </tr>
  );
};

module.exports = AudioItem;
