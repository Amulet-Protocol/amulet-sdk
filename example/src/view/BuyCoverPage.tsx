import { BN, ProductId } from '@amulet/sdk';
import { useCallback, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function BuyCoverPage() {
  const { amulet } = useAmulet();
  const { publicKey, provider, sendAndConfirmTransaction } = useBlockchain();

  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<any>(null);

  const handleBuyCover = useCallback(async () => {
    setSignature('');

    if (publicKey == null || provider == null) {
      return;
    }

    setLoading(true);

    try {
      const { transaction, signers } = await amulet.buyCover({
        provider,
        owner: publicKey,
        referrer: publicKey,
        productId: ProductId.Solend,
        coverToken: amulet.tokens.auwt.publicKey,
        coverAmount: new BN(1e9), // 1 aUWT
        days: 15,
      });

      const result = await sendAndConfirmTransaction(transaction, signers);

      setSignature(result);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [amulet, publicKey, provider, sendAndConfirmTransaction]);

  return (
    <div>
      <h1>Buy Cover</h1>
      <button onClick={handleBuyCover}>Buy Cover</button>
      { loading && <p>Loading...</p> }
      { (signature !== '') && <p>Transaction Successful. Signature: { signature }</p> }
      { (error != null) && <p>Transaction Failed. { error.message }</p> }
    </div>
  );
}
