// Generated by "npm run codegen". Do not modify this file manually.
import type { BN } from '@project-serum/anchor';
import type { PublicKey } from '@solana/web3.js';

export type CoverMetadataState = {
  readonly coverAdminAuthKey: PublicKey;
  readonly coverCallerKeyArray: PublicKey[];
  readonly coverPremiumCurrency: PublicKey;
  readonly coverCurrency: PublicKey;
  readonly coverMinAmount: BN;
  readonly coverMaxAmount: BN;
  readonly coverMinDurationInDays: BN;
  readonly coverMaxDurationInDays: BN;
  readonly coverExtendedClaimDurationInDays: BN;
  readonly coverCount: BN;
};
