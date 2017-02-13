export const TRACK_INFO_REQUEST = 'TRACK_INFO_REQUEST';
export const TRACK_INFO_RECEIVE = 'TRACK_INFO_RECEIVE';

export default {
  [TRACK_INFO_RECEIVE]: (state, { track }) => ({
    ...state,
    tracks: {
      ...state.tracks,
      [track.id]: {
        ...state.tracks[track.id],
        ...track,
      },
    },
  }),
};
