import {
  SAVE_NEW_TRACK,
  TRACK_INFO_REQUEST,
  TRACK_INFO_RECEIVE,
  UPDATE_TRACK_METADATA,
  DELETE_TRACK,
} from './mutations';
import { getTrackItems } from '../services/api';


export const fetchTrackData = async ({ commit }, tracks) => {
  const trackIds = tracks.map(({ id }) => id);

  commit(TRACK_INFO_REQUEST, { trackIds });

  const populatedTracks = await getTrackItems(tracks);

  commit(TRACK_INFO_RECEIVE, { populatedTracks });
};

export const saveNewTrack = ({ commit }, track) => {
  commit(SAVE_NEW_TRACK, { track });
};

export const updateTrackMetadata = (store, { trackId, meta }) => {
  const { commit, dispatch } = store;

  commit(UPDATE_TRACK_METADATA, { trackId, meta });

  // NOTE: This feels a bit gross to me, but I don't yet know a better way.
  // We need to fetch the now-updated track from the state, so that we can
  // dispatch our next action.
  const track = store.state.tracks.byId[trackId];
  dispatch('fetchTrackData', [track]);
};

export const deleteTrack = ({ commit }, trackId) => {
  commit(DELETE_TRACK, { trackId });
};
