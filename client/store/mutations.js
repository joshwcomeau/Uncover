/* eslint-disable no-param-reassign */
import get from 'lodash/get';
import omit from 'lodash/omit';

export const DELETE_TRACK = 'DELETE_TRACK';
export const DELETE_ALL_TRACKS = 'DELETE_ALL_TRACKS';
export const IMPORT_TRACKS = 'IMPORT_TRACKS';
export const SAVE_NEW_TRACK = 'SAVE_NEW_TRACK';
export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_RECEIVE = 'TRACK_INFO_RECEIVE';
export const UPDATE_TRACK_METADATA = 'UPDATE_TRACK_METADATA';


export default {
  [DELETE_TRACK]: (state, { trackId }) => {
    state.tracks.byId = omit(state.tracks.byId, trackId);

    return state;
  },

  [DELETE_ALL_TRACKS]: (state) => {
    state.tracks.byId = {};

    return state;
  },

  [IMPORT_TRACKS]: (state, { tracks }) => {
    state.tracks.byId = {
      ...state.tracks.byId,
      ...tracks,
    };

    return state;
  },

  [SAVE_NEW_TRACK]: (state, { track }) => {
    state.tracks.byId = {
      ...state.tracks.byId,
      [track.id]: track,
    };

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
    const track = state.tracks.byId[populatedTrack.id];

    // Check to see if the track has had a new release since our last update.
    const currentTrackNewestRelease = get(track, 'items[0].releaseDate');
    const nextTrackNewestRelease = get(populatedTrack, 'items[0].releaseDate');
    const hasUnseenRelease = (
      nextTrackNewestRelease &&
      nextTrackNewestRelease !== currentTrackNewestRelease
    );

    state.tracks.byId[populatedTrack.id] = {
      ...populatedTrack,
      isFetching: false,
      hasUnseenRelease,
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
