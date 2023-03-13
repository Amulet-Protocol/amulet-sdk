import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './view/App';

// eslint-disable-next-line import/order
import '@solana/wallet-adapter-react-ui/styles.css';

const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

const config = {
  commitment: 'finalized' as const,
};

const wallets = [
  new PhantomWalletAdapter(),
];

function main() {
  const container = document.getElementById('root');

  if (container != null) {
    const root = createRoot(container);

    root.render((
      <StrictMode>
        <BrowserRouter>
          <ConnectionProvider endpoint={endpoint} config={config}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <App />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </BrowserRouter>
      </StrictMode>
    ));
  }
}

main();
