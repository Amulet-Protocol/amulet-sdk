import type { BN, Provider } from '@project-serum/anchor';
import type { PublicKey, Signer, Transaction } from '@solana/web3.js';

export type CreateTransactionResult = {
  readonly transaction: Transaction;
  readonly signers: Signer[];
};

export type GetPremiumParam = {
  provider: Provider;
  wallet: PublicKey;
  productId: number;
  coverToken: PublicKey;
  coverAmount: BN;
  days: number;
  nftMetadataAddress?: PublicKey;
};

export type GetPremiumResult = {
  premiumToken: PublicKey;
  premium: BN;
};

export type BuyCoverParam = {
  provider: Provider;
  owner: PublicKey;
  referrer: PublicKey;
  productId: number;
  coverToken: PublicKey;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
  nftMetadataAddress?: PublicKey;
};
