import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './view/App';

const endpoint = WalletAdapterNetwork.Devnet;

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
      <React.StrictMode>
        <BrowserRouter>
          <ConnectionProvider endpoint={endpoint} config={config}>
            <WalletProvider wallets={wallets} autoConnect>
              <App />
            </WalletProvider>
          </ConnectionProvider>
        </BrowserRouter>
      </React.StrictMode>
    ));
  }
}

main();
