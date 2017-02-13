export const trackList = ({ tracks }) => (
  tracks.allIds.map(id => tracks.byId[id])
);

export const noTracksYet = ({ tracks }) => (
  !tracks.allIds || tracks.allIds.length === 0
);
