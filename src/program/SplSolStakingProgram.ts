// Generated by "npm run codegen". Do not modify this file manually.
import type { AccountClient, Idl, MethodsNamespace, Provider } from '@coral-xyz/anchor';
import type { PublicKey } from '@solana/web3.js';
import type { InstructionOption } from './Common';
import type * as entity from './SplSolStakingEntity';
import { Program } from '@coral-xyz/anchor';

type SplSolStakingAccountClients = {
  readonly ticketState: AccountClient;
};
type SplSolStakingMethodBuilders = {
  readonly addLiquidity: MethodsNamespace[keyof MethodsNamespace];
  readonly removeLiquidity: MethodsNamespace[keyof MethodsNamespace];
  readonly liqUnstakeSpl: MethodsNamespace[keyof MethodsNamespace];
  readonly stakeSplGetAuwt: MethodsNamespace[keyof MethodsNamespace];
  readonly mintFromSolToAuwt: MethodsNamespace[keyof MethodsNamespace];
  readonly submitWithdrawTicket: MethodsNamespace[keyof MethodsNamespace];
  readonly claimSplTokenFromTicket: MethodsNamespace[keyof MethodsNamespace];
};

export class SplSolStakingProgram {
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
    return this.program.account as SplSolStakingAccountClients;
  }

  public get methods() {
    return this.program.methods as SplSolStakingMethodBuilders;
  }

  public addLiquidity(option: InstructionOption<entity.AddLiquidityParam, entity.AddLiquidityAccounts>) {
    return this.methods.addLiquidity(option.param.splTokenAmount).accounts(option.accounts);
  }

  public removeLiquidity(option: InstructionOption<entity.RemoveLiquidityParam, entity.RemoveLiquidityAccounts>) {
    return this.methods.removeLiquidity(option.param.lpTokenAmount).accounts(option.accounts);
  }

  public liqUnstakeSpl(option: InstructionOption<entity.LiqUnstakeSplParam, entity.LiqUnstakeSplAccounts>) {
    return this.methods.liqUnstakeSpl(option.param.auwtTokenAmount).accounts(option.accounts);
  }

  public stakeSplGetAuwt(option: InstructionOption<entity.StakeSplGetAuwtParam, entity.StakeSplGetAuwtAccounts>) {
    return this.methods.stakeSplGetAuwt(option.param.splTokenAmount).accounts(option.accounts);
  }

  public mintFromSolToAuwt(option: InstructionOption<entity.MintFromSolToAuwtParam, entity.MintFromSolToAuwtAccounts>) {
    return this.methods.mintFromSolToAuwt(option.param.solAmount).accounts(option.accounts);
  }

  public submitWithdrawTicket(option: InstructionOption<entity.SubmitWithdrawTicketParam, entity.SubmitWithdrawTicketAccounts>) {
    return this.methods.submitWithdrawTicket(option.param.auwtAmount).accounts(option.accounts);
  }

  public claimSplTokenFromTicket(option: InstructionOption<void, entity.ClaimSplTokenFromTicketAccounts>) {
    return this.methods.claimSplTokenFromTicket().accounts(option.accounts);
  }
}
