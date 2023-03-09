import { Amulet, Mode } from '@amulet/sdk';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useConnection } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export function useAmulet() {
  const { connection } = useConnection();

  const amulet = useMemo(() => {
    return new Amulet({
      mode: connection.rpcEndpoint === WalletAdapterNetwork.Mainnet ? Mode.Mainnet : Mode.Devnet,
      connection,
      apiSecret: process.env.REACT_APP_API_SECRET ?? '',
    });
  }, [connection]);

  return {
    amulet,
  };
}
