import {atom} from "recoil"

interface productInterface {
    name: string,
    path: string,
    description: string,
    price: string,
    image: string,
    categories: Array<string>,
  }

export const productsListState = atom<{productsList: Array<productInterface>}>({
    key: 'textState',
    default: {
        productsList: [],
    },
});