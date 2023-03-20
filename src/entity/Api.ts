import type { BN } from '@project-serum/anchor';
import type { PublicKey, Signer, Transaction } from '@solana/web3.js';

export type CreateTransactionResult = {
  readonly transaction: Transaction;
  readonly signers: Signer[];
};

export type GetPremiumParam = {
  productId: number;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
};

export type GetPremiumResult = {
  premium: BN;
};

export type BuyCoverParam = {
  owner: PublicKey;
  referrer: PublicKey;
  productId: number;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
  nftMetadataAddress?: PublicKey;
};

export type StakeSolForAuwtParam = {
  staker: PublicKey;
  stakeAmount: BN;
};
