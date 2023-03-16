import { BN } from '@amulet/sdk';
import { useCallback, useMemo, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function StakeSolForAuwtPage() {
  const { amulet } = useAmulet();
  const { publicKey, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const [inputAmount, setInputAmount] = useState('1');

  const stakeAmount = useMemo(() => {
    return new BN(Number(inputAmount) * 1e9);
  }, [inputAmount]);

  const handleStake = useCallback(async () => {
    setSignature('');
    setError(null);

    if (publicKey == null) {
      return;
    }

    setLoading(true);

    try {
      const { transaction, signers } = await amulet.stakeSolForAuwt({
        staker: publicKey,
        stakeAmount,
      });

      const result = await sendAndConfirmTransaction(transaction, signers);

      setSignature(result);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [amulet, publicKey, sendAndConfirmTransaction, stakeAmount]);

  return (
    <div>
      <h1>Stake SOL for aUWT</h1>
      <p>Stake Amount</p>
      <p>
        <input value={inputAmount} onChange={(event) => setInputAmount(event.target.value)} />
        <span> SOL</span>
      </p>
      <button onClick={handleStake}>Stake SOL for aUWT</button>
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
