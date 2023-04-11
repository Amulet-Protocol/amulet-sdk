import type { BN } from '@project-serum/anchor';
import type { PublicKey, Signer, Transaction } from '@solana/web3.js';

/**
 * The transaction result.
 * @property transaction The transaction object.
 * @property signers The transaction signers.
 * @interface
 */
export type CreateTransactionResult = {
  readonly transaction: Transaction;
  readonly signers: Signer[];
};

/**
 * The get premium paramaeter object used in `getPremium` function.
 * @property productId The product identifier.
 * @property coverAmount The cover amount in aUWT currency, decimals of 9.
 * @property days The cover duration in days.
 * @property nftMint The NFT token address for cover discount. Optional.
 * @interface
 */
export type GetPremiumParam = {
  productId: number;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
};

/**
 * The return object of the get premium result.
 * @property premiumt The cover premium in lamports.
 * @interface
 */
export type GetPremiumResult = {
  premium: BN;
};

/**
 * The buy cover paramaeter object used in `buyCover` function.
 * @property owner The wallet address of the cover buyer.
 * @property referrer The wallet address of the referrer.
 * @property productId The cover product identifier.
 * @property coverToken The cover currency, by default is in aUWT.
 * @property coverAmount The cover amount in aUWT, decimals of 9.
 * @property days The cover duration in days.
 * @property nftMint The NFT token address for cover discount. Optional.
 * @interface
 */
export type BuyCoverParam = {
  owner: PublicKey;
  referrer: PublicKey;
  productId: number;
  coverToken: PublicKey;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
};

/**
 * The staking paramaeter object used in `stakeSolForAuwt` function.
 * @property staker The wallet address of the staker.
 * @property stakeAmount The stake amount in lamports.
 * @interface
 */
export type StakeSolForAuwtParam = {
  staker: PublicKey;
  stakeAmount: BN;
};
