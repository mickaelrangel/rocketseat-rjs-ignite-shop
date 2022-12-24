import { useKeenSlider } from "keen-slider/react"
import Image from "next/image"
import { HandbagBox, HomeContainer, Product } from "../styles/pages/home"
import "keen-slider/keen-slider.min.css"
import { GetStaticProps } from "next"
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import Head from "next/head"
import { Handbag } from 'phosphor-react'
import Header from "./components/header"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <Header />

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product
              href={`/product/${product.id}`}
              prefetch={false}
              key={product.id}
              className="keen-slider__slide"
            >
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>
                <HandbagBox>
                  <Handbag size={32} weight="bold" />
                </HandbagBox>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

// Apenas utilizar o 'getServerSideProps' quando houver a necessidade de carregar informações
// que necessariamente precisam que estejam disponíveis assim que a página carregar.
// Ou seja, somente informações que são cruciais estarem em tela para indexadores, bots, crowlers,
// ou qualquer coisa semalhamente.
// Não utilizar 'getServerSideProps' para todas as chamadas API no next.
// Código que roda no lado servidor do Next. Não é visível para o usuário final.
// Caso queria utilizar a página de forma estática (cache) e não precisar fazer a 
// requisição sempre que a página for recarregada, basta utilizar 'getStaticProps' 
// no lugar do 'getServerSideProps'
// 'getStaticProps' não tem acesso ao contexto da requisição (req, res, etc...)
// Ou seja, não tem acesso a informações do usuário logado, headers, cookies, etc...
// Caso queira essas informações, então não tem como usar o 'getStaticProps'. 
// 'getStaticProps' são páginas iguais para todos os usuários que acessarem.
// Se quiser tais informações, utilizar 'getServerSideProps'.
// Para testar o 'getStaticProps' no ambiente local, executar o projeto como se estivesse em produção.
// Para executar o projeto como se estivesse em produção: npm run build + npm run start
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // Gerar a Home novamente a cada 2 horas
  }
}
