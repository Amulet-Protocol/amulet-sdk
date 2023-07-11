import type { StakeSolForAuwtParam } from '../src';

import { Keypair } from '@solana/web3.js';
import { assert } from 'chai';
import { AmuletError, BN } from '../src';
import { createAmulet } from './TestConfig';

describe('stakeSolForAuwt', function() {
  const amulet = createAmulet();

  const param: StakeSolForAuwtParam = {
    staker: Keypair.generate().publicKey,
    stakeAmount: new BN(1e9),
  };

  it('pass', async function() {
    const { instructions } = await amulet.stakeSolForAuwt(param);

    assert.isAtLeast(instructions.length, 1);
  });

  it('coverAmount: zero BN', async function() {
    try {
      await amulet.stakeSolForAuwt({ ...param, stakeAmount: new BN(0) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'stakeAmount must be a positive BN.');
    }
  });

  it('coverAmount: negative BN', async function() {
    try {
      await amulet.stakeSolForAuwt({ ...param, stakeAmount: new BN(-1) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'stakeAmount must be a positive BN.');
    }
  });
});
