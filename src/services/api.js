const apiHost = 'http://localhost:4000';

const toJson = response => response.json();

export const populateTrackItemsAndAvatar = (tracks) => {
  const url = `${apiHost}`;

  // Doing a POST because we're sending a lot of info for a GET.
  // Plus, in the future, this may also save the current 'snapshot' and return
  // a unique ID.
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ tracks }),
  };

  return fetch(url, options).then(toJson);
};
