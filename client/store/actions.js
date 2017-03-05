import {
  DELETE_TRACK,
  DELETE_ALL_TRACKS,
  IMPORT_TRACKS,
  SAVE_NEW_TRACK,
  TRACK_INFO_REQUEST,
  TRACK_INFO_RECEIVE,
  UPDATE_TRACK_METADATA,
} from './mutations';
import { getTrackItems } from '../services/api';


export const fetchTrackData = async (store, trackId) => {
  const { commit } = store;

  commit(TRACK_INFO_REQUEST, { trackId });

  // NOTE: This feels a bit gross to me, but I don't yet know a better way.
  // We need to fetch the now-updated track from the state, so that we can
  // dispatch our next action.
  const track = store.state.tracks.byId[trackId];
  const populatedTrack = await getTrackItems(track);

  commit(TRACK_INFO_RECEIVE, { populatedTrack });
};

export const saveNewTrack = ({ commit }, track) => {
  commit(SAVE_NEW_TRACK, { track });
};

export const updateTrackMetadata = (store, { trackId, meta }) => {
  const { commit, dispatch } = store;

  commit(UPDATE_TRACK_METADATA, { trackId, meta });

  dispatch('fetchTrackData', trackId);
};

export const deleteTrack = ({ commit }, trackId) => {
  commit(DELETE_TRACK, { trackId });
};

export const deleteAllTracks = ({ commit }) => {
  commit(DELETE_ALL_TRACKS);
};

export const importTracks = ({ commit }, tracks) => {
  commit(IMPORT_TRACKS, { tracks });
};
