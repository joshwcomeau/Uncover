/* eslint-disable no-param-reassign */
import omit from 'lodash/omit';

export const DELETE_TRACK = 'DELETE_TRACK';
export const IMPORT_TRACKS = 'IMPORT_TRACKS';
export const SAVE_NEW_TRACK = 'SAVE_NEW_TRACK';
export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_RECEIVE = 'TRACK_INFO_RECEIVE';
export const UPDATE_TRACK_METADATA = 'UPDATE_TRACK_METADATA';


export default {
  [DELETE_TRACK]: (state, { trackId }) => {
    state.tracks.byId = omit(state.tracks.byId, trackId);
    state.tracks.allIds = state.tracks.allIds.filter(id => id !== trackId);

    return state;
  },

  [IMPORT_TRACKS]: (state, { tracks }) => {
    state.tracks.byId = {
      ...state.tracks.byId,
      ...tracks,
    };

    state.tracks.allIds = Object.keys(state.tracks.byId);

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

  [TRACK_INFO_REQUEST]: (state, { trackId }) => {
    const track = state.tracks.byId[trackId];

    state.tracks.byId[trackId] = {
      ...track,
      isFetching: true,
    };

    return state;
  },

  [TRACK_INFO_RECEIVE]: (state, { populatedTrack }) => {
    state.tracks.byId[populatedTrack.id] = {
      ...populatedTrack,
      isFetching: false,
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
