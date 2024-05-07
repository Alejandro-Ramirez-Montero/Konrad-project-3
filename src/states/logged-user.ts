import {atom} from "recoil"

interface LoggedUserInterface {
    email: string;
    name: string;
    password: string;
  }

export const loggedUserState = atom<LoggedUserInterface | undefined>({
    key: 'userState',
    default: undefined,
});