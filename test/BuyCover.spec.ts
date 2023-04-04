import type { BuyCoverParam } from '../src';

import { Keypair } from '@solana/web3.js';
import { assert } from 'chai';
import { AmuletError, BN, ProductId } from '../src';
import { createAmulet } from './TestConfig';

describe('buyCover', function() {
  const amulet = createAmulet();

  const keypair = Keypair.generate();

  const param: BuyCoverParam = {
    owner: keypair.publicKey,
    referrer: keypair.publicKey,
    productId: ProductId.Raydium,
    coverAmount: new BN(1e9),
    days: 30,
  };

  it('pass', async function() {
    const { transaction } = await amulet.buyCover(param);

    assert.isAtLeast(transaction.instructions.length, 1);
  });

  it('productId: zero', async function() {
    try {
      await amulet.buyCover({ ...param, productId: 0 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('productId: negative integer', async function() {
    try {
      await amulet.buyCover({ ...param, productId: -1 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('productId: positive non-integer', async function() {
    try {
      await amulet.buyCover({ ...param, productId: 1.5 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'productId must be a positive integer.');
    }
  });

  it('coverAmount: zero BN', async function() {
    try {
      await amulet.buyCover({ ...param, coverAmount: new BN(0) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'coverAmount must be a positive BN.');
    }
  });

  it('coverAmount: negative BN', async function() {
    try {
      await amulet.buyCover({ ...param, coverAmount: new BN(-1) });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'coverAmount must be a positive BN.');
    }
  });

  it('days: zero', async function() {
    try {
      await amulet.buyCover({ ...param, days: 0 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });

  it('days: negative integer', async function() {
    try {
      await amulet.buyCover({ ...param, days: -1 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });

  it('days: positive non-integer', async function() {
    try {
      await amulet.buyCover({ ...param, days: 1.5 });
    } catch (e: any) {
      assert.instanceOf(e, AmuletError);
      assert.strictEqual(e.message, 'days must be a positive integer.');
    }
  });
});
