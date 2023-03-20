import type { GetPremiumParam } from '../src';

import { clusterApiUrl, Connection } from '@solana/web3.js';
import { assert } from 'chai';
import { Amulet, AmuletError, BN, Mode, ProductId } from '../src';

describe('getPremium', function() {
  const amulet = new Amulet({
    mode: Mode.Devnet,
    connection: new Connection(clusterApiUrl('devnet')),
  });

  const param: GetPremiumParam = {
    productId: ProductId.Raydium,
    coverAmount: new BN(1e9),
    days: 30,
  };

  it('pass', async function() {
    const { premium } = await amulet.getPremium(param);

    assert.isTrue(!premium.isZero());
    assert.isTrue(!premium.isNeg());
  });

  it('productId: zero', async function() {
    try {
      await amulet.getPremium({ ...param, productId: 0 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('productId: negative integer', async function() {
    try {
      await amulet.getPremium({ ...param, productId: -1 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('productId: positive non-integer', async function() {
    try {
      await amulet.getPremium({ ...param, productId: 1.5 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('coverAmount: zero BN', async function() {
    try {
      await amulet.getPremium({ ...param, coverAmount: new BN(0) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'coverAmount must be a positive BN.');
    }
  });

  it('coverAmount: negative BN', async function() {
    try {
      await amulet.getPremium({ ...param, coverAmount: new BN(-1) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'coverAmount must be a positive BN.');
    }
  });

  it('days: zero', async function() {
    try {
      await amulet.getPremium({ ...param, days: 0 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });

  it('days: negative integer', async function() {
    try {
      await amulet.getPremium({ ...param, days: -1 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });

  it('days: positive non-integer', async function() {
    try {
      await amulet.getPremium({ ...param, days: 1.5 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });
});
