import AppProvider from 'src/providers/app'
import { AppProps } from 'next/app'
import 'src/styles/styleOnCanvas.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
)

export default MyApp
