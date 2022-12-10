const { atom } = require("recoil");
const { recoilPersist } = require("recoil-persist");

const {persistAtom} = recoilPersist();

export const musicState = atom({
    key: "musicState",
    default: {
        "isPlaying" : false,
        "playlist" : [],
        "isLoop" : false,
        "curPlaying" : -1,
    },
    // effects_UNSTABLE: [persistAtom],
});
