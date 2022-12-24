import type { AppProps } from 'next/app'
import { OrderContextProvider } from '../contexts/OrderContext'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <OrderContextProvider>
        <Component {...pageProps} />
      </OrderContextProvider>
    </Container>
  )
}
