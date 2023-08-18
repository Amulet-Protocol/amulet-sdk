import type { PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';

export class SendTransactionParam {
  public readonly lookupTables: PublicKey[];
  public readonly instructions: TransactionInstruction[];
  public readonly signers: Signer[];

  public constructor(
    lookupTables: PublicKey[] | PublicKey,
    instructions?: TransactionInstruction[] | TransactionInstruction,
    signers?: Signer[],
  ) {
    this.lookupTables = Array.isArray(lookupTables) ? lookupTables : [lookupTables];
    this.instructions = Array.isArray(instructions)
      ? instructions
      : (instructions == null) ? [] : [instructions];
    this.signers = signers ?? [];
  }

  public merge(other: SendTransactionParam | null | undefined): SendTransactionParam {
    const newLookupTables = this.lookupTables.concat(other?.lookupTables ?? []);
    const newInstructions = this.instructions.concat(other?.instructions ?? []);
    const newSigners = this.signers.concat(other?.signers ?? []);

    return new SendTransactionParam(newLookupTables, newInstructions, newSigners);
  }

  public mergeTx(instruction: TransactionInstruction, signers?: Signer[]): SendTransactionParam {
    const newInstructions = this.instructions.concat(instruction);
    const newSigners = this.signers.concat(signers ?? []);

    return new SendTransactionParam(this.lookupTables, newInstructions, newSigners);
  }

  public toObject() {
    return {
      lookupTables: this.lookupTables,
      instructions: this.instructions,
      signers: this.signers,
    };
  }
}
