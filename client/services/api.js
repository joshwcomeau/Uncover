const apiHost = 'http://localhost:4000';

const toJson = response => response.json();


export const getTrackInfo = ({ searchTerm, category }) => {
  const path = `${apiHost}/get-track-info`;
  const query = `searchTerm=${searchTerm}&category=${category}`;

  return fetch(`${path}?${query}`).then(toJson);
};

export const getTrackItems = (track) => {
  const url = `${apiHost}/get-track-items`;

  // Doing a POST because we're sending a lot of info for a GET.
  // Plus, in the future, this may also save the current 'snapshot' and return
  // a unique ID.
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ track }),
  };

  return fetch(url, options).then(toJson);
};
