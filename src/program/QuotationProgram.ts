// Generated by "npm run codegen". Do not modify this file manually.
import type { AccountClient, Idl, MethodsNamespace, Provider } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';
import type { InstructionOption } from './Common';
import type * as entity from './QuotationEntity';
import { Program } from '@coral-xyz/anchor';

type QuotationAccountClients = {
  readonly quotationResultState: AccountClient;
};
type QuotationMethodBuilders = {
  readonly getPremium: MethodsNamespace[keyof MethodsNamespace];
};

export class QuotationProgram {
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

  public get account() {
    return this.program.account as QuotationAccountClients;
  }

  public get methods() {
    return this.program.methods as QuotationMethodBuilders;
  }

  public getPremium(option: InstructionOption<entity.GetPremiumParam, entity.GetPremiumAccounts>) {
    return this.methods.getPremium(option.param.productId, option.param.coverCurrency, option.param.coverDurationInDays, option.param.coverAmount).accounts(option.accounts);
  }
}
