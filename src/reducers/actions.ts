import { ProductProps } from "./reducer";

export enum ActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

export function addNewProductToCartAction(product: ProductProps) {
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: { product }
    }
}

export function removeProductFromCartAction(productId: string) {
    return {
        type: ActionTypes.REMOVE_FROM_CART,
        payload: { productId }
    }
}