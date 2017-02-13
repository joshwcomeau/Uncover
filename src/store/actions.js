import { TRACK_INFO_REQUEST } from './mutations';

export const fetchTrackInfo = ({ commit }, { id, title }) => {
  // TODO: Fetch info from API!
  commit(TRACK_INFO_REQUEST, { id, title });
};
