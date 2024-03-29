import { createV0Transaction } from '@amulet.org/sdk';
import { PublicKey } from '@solana/web3.js';
import { useCallback, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function WithdrawAmtsolTicketAccountPage() {
  const { amulet } = useAmulet();
  const { connection, publicKey, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const [inputTicket, setInputTicket] = useState('');

  const handleConfirm = useCallback(async () => {
    setSignature('');
    setError(null);

    if (publicKey == null) {
      return;
    }

    setLoading(true);

    try {
      const param = await amulet.withdrawAmtsolTicketAccount({
        staker: publicKey,
        ticketAccount: new PublicKey(inputTicket),
      });

      const paramV0 = await createV0Transaction(connection, publicKey, param);

      const result = await sendAndConfirmTransaction(paramV0);

      setSignature(result);
    } catch (e) {
      const err = amulet.errorParser.parseBuyCoverError(e);

      setError(err ?? e);
    }

    setLoading(false);
  }, [amulet, connection, publicKey, sendAndConfirmTransaction, inputTicket]);

  return (
    <div>
      <h1>Withdraw amtSOL ticket account</h1>
      <p>Ticket Account</p>
      <p>
        <input value={inputTicket} onChange={(event) => setInputTicket(event.target.value)} />
      </p>
      <button onClick={handleConfirm}>Confirm</button>
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
