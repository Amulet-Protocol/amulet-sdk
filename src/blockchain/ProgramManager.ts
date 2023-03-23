import type { Connection } from '@solana/web3.js';
import type { AddressConfig } from '../entity';

import {
  PoolProgram,
  QuotationProgram,
  SplSolStakingProgram,
  UnderwritingProgram,
} from '../program';
import { AppIdl } from './Idl';

export class ProgramManager {
  public readonly connection: Connection;
  public readonly address: AddressConfig;

  public constructor(connection: Connection, address: AddressConfig) {
    this.connection = connection;
    this.address = address;
  }

  public getSplStakingProgram() {
    return new SplSolStakingProgram(AppIdl.SplStaking, this.address.SplStaking.program, { connection: this.connection });
  }

  public getPoolProgram() {
    return new PoolProgram(AppIdl.Pool, this.address.Pool.program, { connection: this.connection });
  }

  public getQuotationProgram() {
    return new QuotationProgram(AppIdl.Quotation, this.address.Quotation.program, { connection: this.connection });
  }

  public getUnderwritingProgram() {
    return new UnderwritingProgram(AppIdl.Underwriting, this.address.Underwrite.program, { connection: this.connection });
  }
}
