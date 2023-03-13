import type { Connection } from '@solana/web3.js';

import { AnchorProvider } from '@project-serum/anchor';

export type AnchorWallet = ConstructorParameters<typeof AnchorProvider>[1];

export function createProvider(connection: Connection, wallet: AnchorWallet) {
  return new AnchorProvider(connection, wallet, {});
}
