/* eslint-disable no-param-reassign */
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';

export const DELETE_TRACK = 'DELETE_TRACK';
export const SAVE_NEW_TRACK = 'SAVE_NEW_TRACK';
export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_RECEIVE = 'TRACK_INFO_RECEIVE';
export const UPDATE_TRACK_METADATA = 'UPDATE_TRACK_METADATA';


export default {
  [DELETE_TRACK]: (state, { trackId }) => {
    console.log('mutation', trackId)
    state.tracks.byId = omit(state.tracks.byId, trackId);
    state.tracks.allIds = state.tracks.allIds.filter(id => id !== trackId);

    return state;
  },

  [SAVE_NEW_TRACK]: (state, { track }) => {
    state.tracks.byId = {
      ...state.tracks.byId,
      [track.id]: track,
    };

    state.tracks.allIds.push(track.id);

    return state;
  },

  [TRACK_INFO_REQUEST]: (state, { trackIds }) => {
    const newTracksById = mapValues(state.tracks.byId, track => ({
      ...track,
      isFetching: trackIds.includes(track.id),
    }));

    state.tracks.byId = {
      ...state.tracks.byId,
      ...newTracksById,
    };

    return state;
  },

  [TRACK_INFO_RECEIVE]: (state, { populatedTracks }) => {
    const newTracksById = mapValues(state.tracks.byId, track => ({
      ...track,
      ...(populatedTracks.find(t => t.id === track.id) || {}),
      isFetching: false,
    }));

    state.tracks.byId = {
      ...state.tracks.byId,
      ...newTracksById,
    };

    return state;
  },

  [UPDATE_TRACK_METADATA]: (state, { trackId, meta }) => {
    const track = state.tracks.byId[trackId];

    state.tracks.byId[trackId] = {
      ...track,
      meta: {
        ...track.meta,
        ...meta,
      },
    };

    return state;
  },
};
