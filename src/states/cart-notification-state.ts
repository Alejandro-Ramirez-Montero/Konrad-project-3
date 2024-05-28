import {atom} from "recoil"


export const cartNotificationState = atom<boolean>({
    key: 'cartNotificationState',
    default: false,
});