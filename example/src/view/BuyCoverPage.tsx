import { BN, ProductId } from '@amulet/sdk';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function BuyCoverPage() {
  const { amulet } = useAmulet();
  const { publicKey, provider, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const [inputProductId, setInputProductId] = useState('1');
  const [inputAmount, setInputAmount] = useState('1');
  const [inputDays, setInputDays] = useState('15');

  const [premium, setPremium] = useState(new BN(0));

  const productId = useMemo(() => {
    return Number(inputProductId);
  }, [inputProductId]);

  const coverAmount = useMemo(() => {
    return new BN(Number(inputAmount) * 1e9);
  }, [inputAmount]);

  const days = useMemo(() => {
    return Number(inputDays);
  }, [inputDays]);

  const handleGetPremium = useCallback(async () => {
    setSignature('');
    setError(null);

    if (publicKey == null || provider == null) {
      return;
    }

    setLoading(true);

    try {
      const result = await amulet.getPremium({
        productId,
        coverAmount,
        days,
      });

      setPremium(result.premium);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [amulet, publicKey, provider, productId, coverAmount, days]);

  const handleBuyCover = useCallback(async () => {
    setSignature('');
    setError(null);

    if (publicKey == null || provider == null) {
      return;
    }

    setLoading(true);

    try {
      const { transaction, signers } = await amulet.buyCover({
        provider,
        owner: publicKey,
        referrer: publicKey,
        productId,
        coverToken: amulet.tokens.auwt.publicKey,
        coverAmount,
        days,
      });

      const result = await sendAndConfirmTransaction(transaction, signers);

      setSignature(result);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [amulet, publicKey, provider, sendAndConfirmTransaction, productId, coverAmount, days]);

  return (
    <div>
      <h1>Buy Cover</h1>
      <p>Product ID</p>
      <p>
        <input value={inputProductId} onChange={(event) => setInputProductId(event.target.value)} />
      </p>
      <p>
        {
          Object.entries(ProductId).map((([name, id]) => (
            <Fragment key={id}>{ id } { name }<br /></Fragment>
          )))
        }
      </p>
      <p>Cover Amount</p>
      <p>
        <input value={inputAmount} onChange={(event) => setInputAmount(event.target.value)} />
        <span> aUWT</span>
      </p>
      <p>Cover Period</p>
      <p>
        <input value={inputDays} onChange={(event) => setInputDays(event.target.value)} />
        <span> day(s)</span>
      </p>
      <p>Premium: { (premium.toNumber() / 1e9).toFixed(4) } SOL</p>
      <button onClick={handleGetPremium}>Get Premium</button>
      <button onClick={handleBuyCover}>Buy Cover</button>
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
