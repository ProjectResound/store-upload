import React from 'react';

const AudioItem = ({ audioItem }) => (
  <section>
    <h3>{audioItem.title}</h3>
    <p>{audioItem.filename}</p>
    <p>{audioItem.created_at}</p>
    <p>{audioItem.updated_at}</p>
  </section>
);

module.exports = AudioItem;
