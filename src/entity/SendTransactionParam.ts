import type { Signer, TransactionInstruction } from '@solana/web3.js';

import { Transaction } from '@solana/web3.js';

export class SendTransactionParam {
  public readonly transaction: Transaction;
  public readonly signers: Signer[];

  public constructor(tx?: Transaction | TransactionInstruction | null | undefined, signers?: Signer[]) {
    this.transaction = new Transaction();

    if (tx != null) {
      this.transaction.add(tx);
    }

    this.signers = signers ?? [];
  }

  public merge(other: SendTransactionParam | null | undefined): SendTransactionParam {
    const newTx = new Transaction().add(this.transaction);

    if (other != null) {
      newTx.add(other.transaction);
    }

    const newSigners = this.signers.concat(other?.signers ?? []);

    return new SendTransactionParam(newTx, newSigners);
  }

  public mergeTx(tx: Transaction | TransactionInstruction | null | undefined, signers?: Signer[]): SendTransactionParam {
    const newTx = new Transaction().add(this.transaction);

    if (tx != null) {
      newTx.add(tx);
    }

    const newSigners = this.signers.concat(signers ?? []);

    return new SendTransactionParam(newTx, newSigners);
  }

  public toObject() {
    return {
      transaction: this.transaction,
      signers: this.signers,
    };
  }
}
