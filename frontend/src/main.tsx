import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import App from './App';
import theme from './theme';

import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
  [goerli, mainnet],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        initialChain={import.meta.env.VITE_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
