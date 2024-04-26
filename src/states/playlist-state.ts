import {atom} from "recoil"

export const playlistState = atom<{playlist: Array<any>}>({
    key: 'textState',
    default: {
        playlist: [],
    },
});