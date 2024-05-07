import {atom} from "recoil"

interface cartProductInterface {
    name: string,
    quantity: number,
    price: number,
    totalPrice: number,
    image: string,
}

export const cartNotificationState = atom<number>({
    key: 'arrayState',
    default: 0,
});