import produce from "immer";
import { ActionTypes } from "./actions";

export interface ProductProps {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
}

interface OrderState {
    products: ProductProps[]
}

export function orderReducer(state: OrderState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            return produce(state, (draft) => {
                draft.products.push(action.payload.product)
            })
        case ActionTypes.REMOVE_FROM_CART:
            return produce(state, (draft) => {
                const listWithoutRemovedProduct = draft.products.filter((product) => {
                    return action.payload.productId !== product.id
                })

                draft.products = listWithoutRemovedProduct
            })
        default:
            return state
    }
}