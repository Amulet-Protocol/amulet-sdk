import { PublicKey } from '@solana/web3.js';
import { useCallback, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function WithdrawAmtsolTicketAccountPage() {
  const { amulet } = useAmulet();
  const { publicKey, sendAndConfirmTransaction } = useBlockchain();

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
      const { transaction, signers } = await amulet.withdrawAmtsolTicketAccount({
        staker: publicKey,
        ticketAccount: new PublicKey(inputTicket),
      });

      const result = await sendAndConfirmTransaction(transaction, signers);

      setSignature(result);
    } catch (e) {
      const err = amulet.errorParser.parseBuyCoverError(e);

      setError(err ?? e);
    }

    setLoading(false);
  }, [amulet, publicKey, sendAndConfirmTransaction, inputTicket]);

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
