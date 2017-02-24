/* eslint-disable no-shadow */
import get from 'lodash/get';


const getEarliestReleaseDateForTrack = track => (
  // If a track doesn't yet have any items, default to 0. This way it gets
  // sorted below tracks that do.
  get(track, 'items[0].releaseDate') || 0
);

export const trackIds = ({ tracks }) => Object.keys(tracks.byId);

export const trackList = ({ tracks }, { trackIds }) => (
  trackIds.map(id => tracks.byId[id])
);

export const sortedTrackList = (state, { trackList }) => (
  trackList.sort((a, b) => {
    const earliestReleaseDateA = getEarliestReleaseDateForTrack(a);
    const earliestReleaseDateB = getEarliestReleaseDateForTrack(b);

    return earliestReleaseDateA < earliestReleaseDateB;
  })
);

export const numOfTracks = (state, { trackIds }) => trackIds.length;

export const noTracksYet = (state, { numOfTracks }) => (
  numOfTracks === 0
);
