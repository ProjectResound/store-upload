import Auth from './auth';

const auth = new Auth();
const apiRoot = 'http://localhost:3000/api/v1';
const accessToken = auth.getAccessToken();
const headers = {
  Authorization: `Bearer ${accessToken}`
};

module.exports = {
  get: (filename) => {
    let uri = `${apiRoot}/audios`;
    if (filename) {
      uri = `${uri}?filename=${filename}`;
    }
    return fetch(uri, { headers })
      .then(response => response.json());
  },
  search: (query) => {
    const uri = `${apiRoot}/audios/search?q=${query}`;
    return fetch(uri, { headers })
      .then(response => response.json());
  },
  auth,
  headers
};

