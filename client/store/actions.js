import { TRACK_INFO_REQUEST, TRACK_INFO_RECEIVE } from './mutations';
import { getTrackItems } from '../services/api';


export const updateTrackInfo = async ({ commit }, tracks) => {
  const trackIds = tracks.map(({ id }) => id);

  commit(TRACK_INFO_REQUEST, { trackIds });

  const populatedTracks = await getTrackItems(tracks);

  commit(TRACK_INFO_RECEIVE, { populatedTracks });
};
