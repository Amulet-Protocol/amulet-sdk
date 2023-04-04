import type { PublicKey } from '@solana/web3.js';

export type TokenDefinition = {
  auwt: {
    publicKey: PublicKey;
  };
  amtsol: {
    publicKey: PublicKey;
  };
};
