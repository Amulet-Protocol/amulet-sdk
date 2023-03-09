import type { WithdrawTicketAccountParam } from '../src';

import { Keypair } from '@solana/web3.js';
import { assert } from 'chai';
import { createAmulet } from './TestConfig';

describe('withdrawAmtsolTicketAccount', function() {
  const amulet = createAmulet();

  const param: WithdrawTicketAccountParam = {
    staker: Keypair.generate().publicKey,
    ticketAccount: Keypair.generate().publicKey,
  };

  it('pass', async function() {
    const { transaction } = await amulet.withdrawAmtsolTicketAccount(param);

    assert.isAtLeast(transaction.instructions.length, 1);
  });
});
