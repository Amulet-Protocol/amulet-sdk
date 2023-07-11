import type { BN } from '@coral-xyz/anchor';
import type { Connection } from '@solana/web3.js';
import type { AddressConfig } from '../entity';
import type { CoverMetadataState } from '../program/CoverEntity';

import { getDecodedAccountInfo } from './BlockchainUtil';
import { AppIdl } from './Idl';

function bnToNumber(bn: BN): number {
  return Number(bn.toString());
}

export class BlockchainReader {
  public readonly connection: Connection;
  public readonly address: AddressConfig;

  public constructor(connection: Connection, address: AddressConfig) {
    this.connection = connection;
    this.address = address;
  }

  public async getCoverAccountInfo() {
    const data = await getDecodedAccountInfo<CoverMetadataState>(this.connection, AppIdl.Cover, 'CoverMetadataState', this.address.Cover.state);

    return {
      premiumToken: data.coverPremiumCurrency,
      coverToken: data.coverCurrency,
      coverAmountMin: data.coverMinAmount,
      coverAmountMax: data.coverMaxAmount,
      coverDaysMin: bnToNumber(data.coverMinDurationInDays),
      coverDaysMax: bnToNumber(data.coverMaxDurationInDays),
      coverCount: bnToNumber(data.coverCount),
    };
  }
}
