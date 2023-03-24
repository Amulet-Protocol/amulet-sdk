// Generated by "npm run codegen". Do not modify this file manually.
import type { Idl, MethodsNamespace, Provider } from '@project-serum/anchor';
import type { PublicKey } from '@solana/web3.js';
import type { InstructionOption } from './Common';
import type * as entity from './UnderwritingEntity';
import { Program } from '@project-serum/anchor';

type UnderwritingMethodBuilders = {
  readonly buyCover: MethodsNamespace[keyof MethodsNamespace];
  readonly renewCover: MethodsNamespace[keyof MethodsNamespace];
  readonly cancelCover: MethodsNamespace[keyof MethodsNamespace];
};

export class UnderwritingProgram {
  public readonly program: Program;

  public constructor(idl: Idl, address: PublicKey, provider: Provider) {
    this.program = new Program(idl, address, provider);
  }

  public get idl() {
    return this.program.idl;
  }

  public get programId() {
    return this.program.programId;
  }

  public get methods() {
    return this.program.methods as UnderwritingMethodBuilders;
  }

  public buyCover(option: InstructionOption<entity.BuyCoverParam, entity.BuyCoverAccounts>) {
    return this.methods
      .buyCover(
        option.param.coverId,
        option.param.coverOwner,
        option.param.coverReferrer,
        option.param.coverProductId,
        option.param.coverDurationInDays,
        option.param.coverCurrency,
        option.param.coverAmount,
      )
      .accounts(option.accounts);
  }

  public renewCover(option: InstructionOption<entity.RenewCoverParam, entity.RenewCoverAccounts>) {
    return this.methods.renewCover(option.param.coverId, option.param.newCoverDurationInDays).accounts(option.accounts);
  }

  public cancelCover(option: InstructionOption<entity.CancelCoverParam, entity.CancelCoverAccounts>) {
    return this.methods.cancelCover(option.param.coverId).accounts(option.accounts);
  }
}
