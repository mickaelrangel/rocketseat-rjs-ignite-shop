import { Header, HandbagButton } from '../../styles/pages/components/header'
import Image from 'next/image'
import logoImg from '../../assets/logo.svg'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingBagModal } from './shopping-bag-modal'

export default function HeaderComponent() {
    const { products } = useContext(OrderContext)
    return (
        <Header>
            <Image src={logoImg} width={150} alt="" />

            <Dialog.Root>
                <Dialog.Trigger asChild disabled={products.length === 0}>
                    <HandbagButton>
                        <Handbag size={24} />
                        {products.length > 0 && (
                            <span>
                                <strong>{products.length}</strong>
                            </span>
                        )}
                    </HandbagButton>
                </Dialog.Trigger>

                <ShoppingBagModal />
            </Dialog.Root>


        </Header>
    )
}