import type { BN } from '@project-serum/anchor';
import type { PublicKey, Signer, Transaction } from '@solana/web3.js';

/**
 * The transaction result.
 * @property transaction The transaction object.
 * @property signers The transaction signers.
 * @interface
 */
export type CreateTransactionResult = {
  transaction: Transaction;
  signers: Signer[];
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
 * @property coverAmount The cover amount in aUWT, decimals of 9.
 * @property days The cover duration in days.
 * @property nftMint The NFT token address for cover discount. Optional.
 * @interface
 */
export type BuyCoverParam = {
  owner: PublicKey;
  referrer: PublicKey;
  productId: number;
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

/**
 * The aUWT redeem object used in `redeemAuwtForAmtsolDelayed` function.
 * @property staker The wallet address of the staker.
 * @property redeemAmount The redeem amount in lamports.
 * @interface
 */
export type RedeemAuwtDelayedParam = {
  staker: PublicKey;
  redeemAmount: BN;
};

/**
 * The aUWT redeem result object return by `redeemAuwtForAmtsolDelayed` function.
 * @property ticketAccount The ticket token account address of the staker.
 * @interface
 */
export type RedeemAuwtDelayedResult = CreateTransactionResult & {
  ticketAccount: PublicKey;
};

/**
 * The ticket withdrawal paramaeter object used in `withdrawAmtsolTicketAccount` function.
 * @property staker The wallet address of the staker.
 * @property ticketAccount The ticket token account address of the staker.
 * @interface
 */
export type WithdrawTicketAccountParam = {
  staker: PublicKey;
  ticketAccount: PublicKey;
};
