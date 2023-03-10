import { BN, ProductId } from '@amulet/sdk';
import { useCallback, useState } from 'react';
import { useAmulet, useBlockchain } from '../hook';

export default function BuyCoverPage() {
  const { amulet } = useAmulet();
  const { publicKey, provider, sendAndConfirmTransaction } = useBlockchain();

  const [signature, setSignature] = useState('');

  const handleBuyCover = useCallback(async () => {
    setSignature('');

    if (publicKey == null || provider == null) {
      return;
    }

    const { transaction, signers } = await amulet.buyCover({
      provider,
      owner: publicKey,
      referrer: publicKey,
      productId: ProductId.Raydium,
      amount: new BN(10 ** 9),
      days: 1,
    });

    const result = await sendAndConfirmTransaction(transaction, signers);

    setSignature(result);
  }, [amulet, publicKey, provider, sendAndConfirmTransaction]);

  return (
    <div>
      <h1>Buy Cover</h1>
      <button onClick={handleBuyCover}>Buy Cover</button>
      {
        (signature !== '') && <div>Transaction Successful. Signature: { signature }</div>
      }
    </div>
  );
}
