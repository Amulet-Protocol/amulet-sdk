import type { CreateV0TransactionResult } from '@amulet.org/sdk';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';

export function useBlockchain() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendAndConfirmTransaction = useCallback(async (result: CreateV0TransactionResult) => {
    const signature = await sendTransaction(result.versionedTransaction, connection, {
      minContextSlot: result.slot,
    });

    await connection.confirmTransaction({
      signature,
      blockhash: result.blockhash,
      lastValidBlockHeight: result.lastValidBlockHeight,
    });

    return signature;
  }, [connection, sendTransaction]);

  return {
    connection,
    publicKey,
    sendAndConfirmTransaction,
  };
}
