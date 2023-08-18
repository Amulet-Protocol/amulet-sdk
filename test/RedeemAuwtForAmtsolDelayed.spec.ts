import type { RedeemAuwtDelayedParam } from '../src';

import { Keypair, PublicKey } from '@solana/web3.js';
import { assert } from 'chai';
import { AmuletError, BN } from '../src';
import { createAmulet } from './TestConfig';

describe('redeemAuwtForAmtsolDelayed', function() {
  const amulet = createAmulet();

  const param: RedeemAuwtDelayedParam = {
    staker: Keypair.generate().publicKey,
    redeemAmount: new BN(1e9),
  };

  it('pass', async function() {
    const { instructions, ticketAccount } = await amulet.redeemAuwtForAmtsolDelayed(param);

    assert.isAtLeast(instructions.length, 1);
    assert.isFalse(ticketAccount.equals(PublicKey.default));
  });

  it('coverAmount: zero BN', async function() {
    try {
      await amulet.redeemAuwtForAmtsolDelayed({ ...param, redeemAmount: new BN(0) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'redeemAmount must be a positive BN.');
    }
  });

  it('coverAmount: negative BN', async function() {
    try {
      await amulet.redeemAuwtForAmtsolDelayed({ ...param, redeemAmount: new BN(-1) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'redeemAmount must be a positive BN.');
    }
  });
});
