const apiRoot = 'http://localhost:3000/api/v1';

module.exports = {
  get: (filename) => {
    let uri = `${apiRoot}/audios`;
    if (filename) {
      uri = `${uri}?filename=${filename}`;
    }
    return fetch(uri)
      .then(response => response.json());
  },
  search: (query) => {
    const uri = `${apiRoot}/audios/search?q=${query}`;
    return fetch(uri)
      .then(response => response.json());
  }
};
