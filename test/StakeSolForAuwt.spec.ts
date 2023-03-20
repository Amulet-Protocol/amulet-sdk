import type { StakeSolForAuwtParam } from '../src';

import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { assert } from 'chai';
import { Amulet, AmuletError, BN, Mode } from '../src';

describe('stakeSolForAuwt', function() {
  const amulet = new Amulet({
    mode: Mode.Devnet,
    connection: new Connection(clusterApiUrl('devnet')),
  });

  const keypair = Keypair.generate();

  const param: StakeSolForAuwtParam = {
    staker: keypair.publicKey,
    stakeAmount: new BN(1e9),
  };

  it('pass', async function() {
    const { transaction } = await amulet.stakeSolForAuwt(param);

    assert.isAtLeast(transaction.instructions.length, 1);
  });

  it('coverAmount: zero BN', async function() {
    try {
      await amulet.stakeSolForAuwt({ ...param, stakeAmount: new BN(0) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'stakeAmount must be a positive BN.');
    }
  });

  it('coverAmount: stakeSolForAuwt BN', async function() {
    try {
      await amulet.stakeSolForAuwt({ ...param, stakeAmount: new BN(-1) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'stakeAmount must be a positive BN.');
    }
  });
});
