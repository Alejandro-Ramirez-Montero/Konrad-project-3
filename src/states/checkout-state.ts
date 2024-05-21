import {atom} from "recoil"
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

interface CheckoutInterface {
    province: string | undefined;
    city: string | undefined;
    address1: string | undefined;
    address2: string | undefined;
    zipCode: number | undefined;
    cardNumber: number | undefined;
    cardHolderName: string | undefined;
    expireDate: Date | undefined;
    cvv: number | undefined;
}

export const checkoutState = atom<CheckoutInterface>({
    key: 'checkoutState',
    default: {
        province: undefined,
        city: undefined,
        address1: undefined,
        address2: undefined,
        zipCode: undefined,
        cardNumber: undefined,
        cardHolderName: undefined,
        expireDate: undefined,
        cvv: undefined,
    },
    effects_UNSTABLE: [persistAtom],
});