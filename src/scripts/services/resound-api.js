import Auth from "./auth";
import { API_URL } from "../constants/api-urls";

const auth = new Auth();
const accessToken = auth.getAccessToken();
const headers = {
  Authorization: `Bearer ${accessToken}`
};

module.exports = {
  get: filename => {
    let uri = `${API_URL}/audios`;
    if (filename) {
      uri = `${uri}?filename=${filename}`;
    }
    return fetch(uri, { headers }).then(response => response.json());
  },
  getAudioById: id =>
    fetch(`${API_URL}/audios/${id}`, { headers }).then(response =>
      response.json()
    ),
  getPage: page => {
    const uri = `${API_URL}/audios?page=${page}`;
    return fetch(uri, { headers }).then(response => response.json());
  },
  search: query => {
    const uri = `${API_URL}/audios/search?q=${query}`;
    return fetch(uri, { headers }).then(response => response.json());
  },
  users: {
    create: (authToken, idToken) => {
      const uri = `${API_URL}/users`;
      return fetch(uri, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ idToken })
      });
    }
  },
  getWorkingOn: () => {
    const uri = `${API_URL}/audios?working_on=true`;
    return fetch(uri, { headers }).then(response => response.json());
  },
  populateContributors: () => {
    const uri = `${API_URL}/contributors`;
    return fetch(uri, { headers }).then(response => response.json());
  },
  updateAudio: audio => {
    const uri = `${API_URL}/audios/${audio.id}`;
    return fetch(uri, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        title: audio.title,
        contributors: audio.contributors,
        tags: audio.tags
      })
    }).then(response => response.json());
  },
  deleteAudio: audioId => {
    const uri = `${API_URL}/audios/${audioId}`;
    return fetch(uri, {
      method: "DELETE",
      headers
    });
  },
  auth,
  headers
};
