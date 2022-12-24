import { createContext, ReactNode, useReducer } from "react";
import { addNewProductToCartAction, removeProductFromCartAction } from "../reducers/actions";
import { orderReducer, ProductProps } from "../reducers/reducer";

interface OrderContextData {
    products: ProductProps[]
    addToCart: (product: ProductProps) => void
    removeFromCart: (productId: string) => void
}

interface OrderContextProviderProps {
    children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderContextProvider({ children }: OrderContextProviderProps) {
    const [orderState, dispatch] = useReducer(orderReducer, {
        products: []
    })

    const { products } = orderState

    function addToCart(product: ProductProps) {
        dispatch(addNewProductToCartAction(product))
    }

    function removeFromCart(productId: string) {
        dispatch(removeProductFromCartAction(productId))
    }

    return (
        <OrderContext.Provider
            value={{
                products,
                addToCart,
                removeFromCart
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}