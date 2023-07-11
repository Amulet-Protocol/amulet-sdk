import type { Connection, PublicKey } from '@solana/web3.js';
import type * as api from '../entity/Api';

import { TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { AmuletError } from '../entity';

export async function createV0Transaction(
  connection: Connection,
  payerKey: PublicKey,
  result: api.CreateTransactionResult,
): Promise<api.CreateV0TransactionResult> {
  const lookupTableAccounts = await Promise.all(result.lookupTables.map(async (lookupTable) => {
    const { value } = await connection.getAddressLookupTable(lookupTable);

    if (value == null) {
      throw new AmuletError(`AddressLookupTable Account of ${lookupTable.toString()} is null.`);
    }

    return value;
  }));

  const { context, value } = await connection.getLatestBlockhashAndContext();

  const messageV0 = new TransactionMessage({
    payerKey,
    instructions: result.instructions,
    recentBlockhash: value.blockhash,
  }).compileToV0Message(lookupTableAccounts);

  const versionedTransaction = new VersionedTransaction(messageV0);

  versionedTransaction.sign(result.signers);

  return {
    versionedTransaction,
    slot: context.slot,
    blockhash: value.blockhash,
    lastValidBlockHeight: value.lastValidBlockHeight,
  };
}
