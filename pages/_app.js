import { StarknetProvider, InjectedConnector } from '@starknet-react/core'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (<StarknetProvider connectors={[new InjectedConnector()]}>
  <Component {...pageProps} />
</StarknetProvider>)
}

export default App
