import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import Stripe from "stripe"
import { OrderContext } from "../../contexts/OrderContext"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/products"
import Header from "../components/header"

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { addToCart } = useContext(OrderContext)
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
    const router = useRouter()

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            // redirecionamento para rota (aplicação) externa ao projeto
            window.location.href = checkoutUrl

            // para redirecionar para rota interna (checkout é um componente do projeto, por exemplo)
            // utilizar o hook useRouter e executar o router.push('/checkout')

        } catch (error) {
            // Conectar com uma ferramente de observabilidade (Datalog / Sentry)
            setIsCreatingCheckoutSession(false)
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    function handleAddProductToCart() {
        addToCart(product)
        router.push('/')
    }

    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading..</p>
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <Header />

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>
                        {product.description}
                    </p>

                    <button onClick={handleAddProductToCart} disabled={isCreatingCheckoutSession}>
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // O que fazer: 
    // 1) buscar os produtos mais vendidos / mais acessados para passar para os paths - Obs: Com stripe não é possível
    // 2) Opção fallback: para os casos em que o path do produto não é mapeado para static
    // Fallback false: error 404
    // Fallback true: vai pegar o id do produto passado para tentar executar 'getStaticProps' para buscar o produto
    // e gerar a versão estática dele.
    // paths: pode ser vazio

    return {
        paths: [
            { params: { id: 'prod_MwO0CoNGfGnUVN' } }
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (!params) {
        return {
            notFound: true // Caso não exista parametros, retorna um 404
        }
    }

    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount! / 100),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // Salvar essa página por 1 hora no cache
    }
} 