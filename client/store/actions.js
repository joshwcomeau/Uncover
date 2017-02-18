import { SAVE_NEW_TRACK, TRACK_INFO_REQUEST, TRACK_INFO_RECEIVE } from './mutations';
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
