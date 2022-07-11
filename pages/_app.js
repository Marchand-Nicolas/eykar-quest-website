import { StarknetProvider, getInstalledInjectedConnectors } from '@starknet-react/core'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  const connectors = getInstalledInjectedConnectors()

  return (<StarknetProvider connectors={connectors}>
  <Component {...pageProps} />
</StarknetProvider>)
}

export default App
