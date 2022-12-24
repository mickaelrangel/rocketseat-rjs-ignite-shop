import axios from "axios"
import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, Product, ImageContainer, ProductDetails, TotalQuantityProducts, Amount, CheckoutButton } from '../../styles/pages/components/shopping-bag-modal'
import { X } from 'phosphor-react'
import Image from "next/image"
import { useContext, useState } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

export function ShoppingBagModal() {
    const { products, removeFromCart } = useContext(OrderContext)
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProducts() {
        try {
            setIsCreatingCheckoutSession(true)

            const productsByPriceId = products.map((product) => {
                return product.defaultPriceId
            })

            const response = await axios.post('/api/checkout', {
                productsPriceId: productsByPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (err) {
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    function handleRemoveProductFromCart(productId: string) {
        removeFromCart(productId)
    }

    function getAmount(): string {
        const sum = products.reduce((sum, product) => {
            const price = product.price.replace('R$', '')
            return sum + parseInt(price);
        }, 0)

        const amount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(sum)

        return amount
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <Dialog.Title>Sacola de compras</Dialog.Title>
                {products.map(product => {
                    return (

                        <Product key={product.id}>
                            <ImageContainer>
                                <Image src={product.imageUrl} width={102} height={93} alt="" />
                            </ImageContainer>

                            <ProductDetails>
                                <h4>{product.name}</h4>
                                <span>{product.price}</span>
                                <button onClick={() => handleRemoveProductFromCart(product.id)}>
                                    Remover
                                </button>
                            </ProductDetails>
                        </Product>
                    )
                })}

                <TotalQuantityProducts>
                    <span>Quantidade</span>
                    <span>{products.length} itens</span>
                </TotalQuantityProducts>
                <Amount>
                    <span>Valor total</span>
                    <span>{getAmount()}</span>
                </Amount>
                <CheckoutButton
                    onClick={handleBuyProducts}
                    disabled={products.length === 0 || isCreatingCheckoutSession}
                >
                    Finalizar compra
                </CheckoutButton>
            </Content>
        </Dialog.Portal>
    )
}