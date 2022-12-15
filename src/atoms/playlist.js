const { atom } = require('recoil');

export const playlistState = atom({
  key: 'playlistState',
  default: {
    isChange: false,
  },
});
