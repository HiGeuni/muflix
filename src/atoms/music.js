const { atom } = require("recoil");

export const musicState = atom({
    key: "musicState",
    default: {
        "isPlaying" : false,
        "playlist" : [],
        "isFloating" : false,
    },
});
