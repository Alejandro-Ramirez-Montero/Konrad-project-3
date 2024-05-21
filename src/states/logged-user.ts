import {atom} from "recoil"
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface LoggedUserInterface {
    email: string;
    name: string;
    password: string;
}

export const loggedUserState = atom<LoggedUserInterface | undefined>({
    key: 'userState',
    default: undefined,
    effects_UNSTABLE: [persistAtom],
});