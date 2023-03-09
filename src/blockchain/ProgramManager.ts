import type { Provider } from '@project-serum/anchor';
import type { AddressConfig } from '../entity';

import {
  AmuletSolStakingProgram,
  PoolProgram,
  QuotationProgram,
  SplSolStakingProgram,
  UnderwritingProgram,
} from '../program';
import { AppIdl } from './Idl';

export class ProgramManager {
  public readonly address: AddressConfig;

  public constructor(address: AddressConfig) {
    this.address = address;
  }

  public getSolStakingProgram(provider: Provider) {
    return new AmuletSolStakingProgram(AppIdl.SolStaking, this.address.SolStaking.program, provider);
  }

  public getSplStakingProgram(provider: Provider) {
    return new SplSolStakingProgram(AppIdl.SplStaking, this.address.SplStaking.program, provider);
  }

  public getPoolProgram(provider: Provider) {
    return new PoolProgram(AppIdl.Pool, this.address.Pool.program, provider);
  }

  public getQuotationProgram(provider: Provider) {
    return new QuotationProgram(AppIdl.Quotation, this.address.Quotation.program, provider);
  }

  public getUnderwritingProgram(provider: Provider) {
    return new UnderwritingProgram(AppIdl.Underwriting, this.address.Underwrite.program, provider);
  }
}
