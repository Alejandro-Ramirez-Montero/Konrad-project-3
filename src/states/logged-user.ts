import {atom} from "recoil"

interface LoggedUserInterface {
    email: string;
    fullName: string;
    role: string;
}

export const loggedUserState = atom<LoggedUserInterface | undefined>({
    key: 'userState',
    default: undefined,
});