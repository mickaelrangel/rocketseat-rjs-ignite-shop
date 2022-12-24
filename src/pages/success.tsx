import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer, ImageDirection } from "../styles/pages/sucess";

interface ProductProps {
    name: string;
    imageUrl: string;
}

interface SucessProps {
    customerName: string;
    products: ProductProps[];
}

export default function Success({ customerName, products }: SucessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <ImageDirection>
                    {products.map(product => {
                        return (
                            <ImageContainer key={product.name}>
                                <Image
                                    src={product.imageUrl}
                                    width={120}
                                    height={110}
                                    alt=""
                                />
                            </ImageContainer>
                        )
                    })}
                </ImageDirection>

                <p>
                    Uhuull, <strong>{customerName}</strong>,
                    sua compra de {products.length} camisetas
                    já está a caminho da sua casa.
                </p>

                <Link href="/">
                    Voltar ao catálago
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name

    const productsProps = session.line_items?.data.map((item) => {
        const product = item.price?.product as Stripe.Product

        const productProps: ProductProps = {
            name: product.name,
            imageUrl: product.images[0]
        }

        return productProps
    })

    return {
        props: {
            customerName,
            products: productsProps
        }
    }
}