import { BN, createV0Transaction } from '@amulet.org/sdk';
import { useCallback, useMemo, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function RedeemAuwtForAmtsolDelayedPage() {
  const { amulet } = useAmulet();
  const { connection, publicKey, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const [inputAmount, setInputAmount] = useState('1');
  const [ticket, setTicket] = useState('');

  const redeemAmount = useMemo(() => {
    return new BN(Number(inputAmount) * 1e9);
  }, [inputAmount]);

  const handleConfirm = useCallback(async () => {
    setSignature('');
    setError(null);
    setTicket('');

    if (publicKey == null) {
      return;
    }

    setLoading(true);

    try {
      const param = await amulet.redeemAuwtForAmtsolDelayed({
        staker: publicKey,
        redeemAmount,
      });

      const paramV0 = await createV0Transaction(connection, publicKey, param);

      const result = await sendAndConfirmTransaction(paramV0);

      setSignature(result);
      setTicket(param.ticketAccount.toString());
    } catch (e) {
      const err = amulet.errorParser.parseBuyCoverError(e);

      setError(err ?? e);
    }

    setLoading(false);
  }, [amulet, connection, publicKey, sendAndConfirmTransaction, redeemAmount]);

  return (
    <div>
      <h1>Redeem aUWT for amtSOL delayed</h1>
      <p>Redeem Amount</p>
      <p>
        <input value={inputAmount} onChange={(event) => setInputAmount(event.target.value)} />
        <span> aUWT</span>
      </p>
      <button onClick={handleConfirm}>Confirm</button>
      { (ticket !== '') && <p>Ticket Account: { ticket }</p> }
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
