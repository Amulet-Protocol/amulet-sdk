import { BN, createV0Transaction } from '@amulet.org/sdk';
import { useCallback, useMemo, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function StakeSolForAuwtPage() {
  const { amulet } = useAmulet();
  const { connection, publicKey, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const [inputAmount, setInputAmount] = useState('1');

  const stakeAmount = useMemo(() => {
    return new BN(Number(inputAmount) * 1e9);
  }, [inputAmount]);

  const handleConfirm = useCallback(async () => {
    setSignature('');
    setError(null);

    if (publicKey == null) {
      return;
    }

    setLoading(true);

    try {
      const param = await amulet.stakeSolForAuwt({
        staker: publicKey,
        stakeAmount,
      });

      const paramV0 = await createV0Transaction(connection, publicKey, param);

      const result = await sendAndConfirmTransaction(paramV0);

      setSignature(result);
    } catch (e) {
      const err = amulet.errorParser.parseBuyCoverError(e);

      setError(err ?? e);
    }

    setLoading(false);
  }, [amulet, connection, publicKey, sendAndConfirmTransaction, stakeAmount]);

  return (
    <div>
      <h1>Stake SOL for aUWT</h1>
      <p>Stake Amount</p>
      <p>
        <input value={inputAmount} onChange={(event) => setInputAmount(event.target.value)} />
        <span> SOL</span>
      </p>
      <button onClick={handleConfirm}>Confirm</button>
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
