import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, SYSVAR_CLOCK_PUBKEY, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';

export const PublicKeys = {
  SystemProgram: SystemProgram.programId,
  SysvarClock: SYSVAR_CLOCK_PUBKEY,
  SysvarRent: SYSVAR_RENT_PUBKEY,
  TokenProgram: TOKEN_PROGRAM_ID,
  AssociatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
};
