const { atom } = require('recoil');
// const { recoilPersist } = require('recoil-persist');

// const { persistAtom } = recoilPersist();

export const musicState = atom({
  key: 'musicState',
  default: {
    isPlaying: false,
    playlist: [],
    curPlaying: -1,
    newPlaylist: false,
  },
  // effects_UNSTABLE: [persistAtom],
});
