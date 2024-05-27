import {atom} from "recoil"
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const userTokenState = atom<string | undefined>({
    key: 'userTokenState',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});