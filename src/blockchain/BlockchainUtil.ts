import type { Idl } from '@project-serum/anchor';
import type { AccountInfo, Connection, TransactionInstruction } from '@solana/web3.js';

import { BorshCoder, utils } from '@project-serum/anchor';
import * as SplToken from '@solana/spl-token';
import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { AmuletError } from '../entity';

export async function getAccountInfo(connection: Connection, publicKey: PublicKey): Promise<AccountInfo<Buffer>> {
  const info = await connection.getAccountInfo(publicKey);

  if (info == null) {
    throw new AmuletError(`The account info of ${publicKey.toString()} is null.`);
  }

  return info;
}

export async function getDecodedAccountInfo<T>(connection: Connection, idl: Idl, accountName: string, publicKey: PublicKey): Promise<T> {
  const info = await getAccountInfo(connection, publicKey);

  const coder = new BorshCoder(idl);

  return coder.accounts.decode<T>(accountName, info.data);
}

export function setComputeBudgetInstruction(units: number): TransactionInstruction {
  return ComputeBudgetProgram.setComputeUnitLimit({ units });
}

// Find the associated token account address for the specified token of a wallet.
// - The associated token account may or may not exist. The associated token account must be created
//   before use.
export function findAta(tokenMintAddress: PublicKey, owner: PublicKey): Promise<PublicKey> {
  return SplToken.getAssociatedTokenAddress(tokenMintAddress, owner);
}

// Find the program-derived account (PDA) based on the seeds.
// - The program-derived account may or may not exist. The program-derived account must be created
//   before use.
export function findPda(programId: PublicKey, seeds: (PublicKey | string)[]): [PublicKey, number] {
  const buffers = seeds.map((seed) => (seed instanceof PublicKey) ? seed.toBuffer() : utils.bytes.utf8.encode(seed));

  return PublicKey.findProgramAddressSync(buffers, programId);
}
