import type { Signer, Transaction } from '@solana/web3.js';

import { createProvider } from '@amulet/sdk';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';

export function useBlockchain() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const anchor = useAnchorWallet();

  const provider = useMemo(() => {
    return (anchor == null) ? null : createProvider(connection, anchor);
  }, [connection, anchor]);

  // Adapted from https://github.com/solana-labs/wallet-adapter/blob/master/APP.md page.
  const sendAndConfirmTransaction = useCallback(async (transaction: Transaction, signers: Signer[]) => {
    const { context, value } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot: context.slot,
      signers,
    });

    await connection.confirmTransaction({
      signature,
      blockhash: value.blockhash,
      lastValidBlockHeight: value.lastValidBlockHeight,
    });

    return signature;
  }, [connection, sendTransaction]);

  return {
    connection,
    publicKey,
    provider,
    sendAndConfirmTransaction,
  };
}
