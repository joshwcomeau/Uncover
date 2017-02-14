/* eslint-disable */
import mapValues from 'lodash/mapValues';

export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_RECEIVE = 'TRACK_INFO_RECEIVE';

export default {
  [TRACK_INFO_REQUEST]: (state, { trackIds }) => {
    console.log("Request commit");
    const newTracksById = mapValues(state.tracks.byId, track => ({
      ...track,
      isFetching: trackIds.includes(track.id),
    }));

    state.tracks.byId = Object.assign({}, state.tracks.byId, newTracksById);

    console.log(newTracksById);

    return state;
  },

  [TRACK_INFO_RECEIVE]: (state, { populatedTracks }) => {
    const newTracksById = mapValues(state.tracks.byId, track => ({
      ...track,
      ...(populatedTracks.find(t => t.id === track.id) || {}),
      isFetching: false,
    }));

    state.tracks.byId = Object.assign({}, state.tracks.byId, newTracksById);

    return state;
  },
};
