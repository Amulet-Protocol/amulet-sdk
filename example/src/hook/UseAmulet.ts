import { Amulet, Mode } from '@amulet.org/sdk';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useConnection } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

export function useAmulet() {
  const { connection } = useConnection();

  const amulet = useMemo(() => {
    return new Amulet({
      mode: connection.rpcEndpoint === clusterApiUrl(WalletAdapterNetwork.Mainnet) ? Mode.Mainnet : Mode.Devnet,
      connection,
      apiSecret: process.env.REACT_APP_API_SECRET ?? '',
    });
  }, [connection]);

  return {
    amulet,
  };
}
