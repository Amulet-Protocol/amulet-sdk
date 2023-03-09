import type { BN } from '@project-serum/anchor';
import type { PublicKey, Signer, Transaction } from '@solana/web3.js';

/**
 * @property transaction The transaction object.
 * @property signers The transaction signers.
 * @interface
 */
export type CreateTransactionResult = {
  transaction: Transaction;
  signers: Signer[];
};

/**
 * The parameter of `getPremium` function.
 *
 * @property productId The product identifier.
 * @property coverAmount The cover amount in aUWT in lamports.
 * @property days The cover duration in days.
 * @property nftMint The NFT token address for cover discount.
 * @interface
 */
export type GetPremiumParam = {
  productId: number;
  coverAmount: BN;
  days: number;
  nftMint?: PublicKey;
};

/**
 * The return value of `getPremium` function.
 *
 * @property premium The cover premium in SOL in lamports.
 * @interface
 */
export type GetPremiumResult = {
  premium: BN;
};

/**
 * The parameter of `buyCover` function.
 *
 * @property owner The wallet address of the cover buyer.
 * @property referrer The wallet address of the referrer.
 * @property productId The cover product identifier.
 * @property coverAmount The cover amount in aUWT in lamports.
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
 * The parameter of `stakeSolForAuwt` function.
 *
 * @property staker The wallet address of the staker.
 * @property stakeAmount The stake amount in SOL in lamports.
 * @interface
 */
export type StakeSolForAuwtParam = {
  staker: PublicKey;
  stakeAmount: BN;
};

/**
 * The parameter of `redeemAuwtForAmtsolDelayed` function.
 *
 * @property staker The wallet address of the staker.
 * @property redeemAmount The redeem amount in aUWT in lamports.
 * @interface
 */
export type RedeemAuwtDelayedParam = {
  staker: PublicKey;
  redeemAmount: BN;
};

/**
 * The return value of `redeemAuwtForAmtsolDelayed` function.
 *
 * @property ticketAccount The ticket account address.
 * @interface
 */
export type RedeemAuwtDelayedResult = CreateTransactionResult & {
  ticketAccount: PublicKey;
};

/**
 * The parameter of `withdrawAmtsolTicketAccount` function.
 *
 * @property staker The wallet address of the staker.
 * @property ticketAccount The ticket account address.
 * @interface
 */
export type WithdrawTicketAccountParam = {
  staker: PublicKey;
  ticketAccount: PublicKey;
};
