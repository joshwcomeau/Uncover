export const trackIds = ({ tracks }) => tracks.allIds;

export const trackList = ({ tracks }) => (
  tracks.allIds.map(id => tracks.byId[id])
);

export const sortedTrackList = ({ tracks }) => (
  tracks.allIds
    .map(id => tracks.byId[id])
    .sort((a, b) => (a.items[0].releaseDate < b.items[0].releaseDate ? 1 : -1))
);

export const noTracksYet = ({ tracks }) => (
  !tracks.allIds || tracks.allIds.length === 0
);
