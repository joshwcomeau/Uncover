import get from 'lodash/get';


const getEarliestReleaseDateForTrack = track => (
  // If a track doesn't yet have any items, default to 0. This way it gets
  // sorted below tracks that do.
  get(track, 'items[0].releaseDate') || 0
);

export const trackIds = ({ tracks }) => tracks.allIds;

export const trackList = ({ tracks }) => (
  tracks.allIds.map(id => tracks.byId[id])
);

export const sortedTrackList = ({ tracks }) => (
  trackList({ tracks }).sort((a, b) => {
    const earliestReleaseDateA = getEarliestReleaseDateForTrack(a);
    const earliestReleaseDateB = getEarliestReleaseDateForTrack(b);

    return earliestReleaseDateA < earliestReleaseDateB;
  })
);

export const noTracksYet = ({ tracks }) => (
  !tracks.allIds || tracks.allIds.length === 0
);
