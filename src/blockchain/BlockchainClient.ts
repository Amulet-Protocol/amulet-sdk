import type { Connection, Signer } from '@solana/web3.js';
import type { AddressConfig } from '../entity';
import type * as api from '../entity/Api';

import { BN } from '@project-serum/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { AmuletError, SendTransactionParam } from '../entity';
import { findAta, findPda, getOrCreateAta, setComputeBudgetInstruction } from './BlockchainUtil';
import { ProgramManager } from './ProgramManager';
import { PublicKeys } from './PublicKeys';

export class BlockchainClient {
  private readonly connection: Connection;
  private readonly address: AddressConfig;
  private readonly programManager: ProgramManager;

  public constructor(connection: Connection, address: AddressConfig) {
    this.connection = connection;
    this.address = address;
    this.programManager = new ProgramManager(connection, address);
  }

  public async coverBuy(param: api.BuyCoverParam & {
    coverId: string;
  }): Promise<SendTransactionParam> {
    const {
      owner, referrer, productId, coverId, coverAmount, days, nftMint,
    } = param;

    const program = this.programManager.getUnderwritingProgram();

    const accounts = this.getProductAccountsOrThrow(productId);

    const [coverStatePda] = this.findCoverStatePda(coverId);
    const nftAta = (nftMint == null) ? PublicKey.default : await findAta(nftMint, owner);
    const nftMetadataState = (nftMint == null) ? PublicKey.default : this.findNftMetadataPda(nftMint)[0];

    const instruction = await program.buyCover({
      param: {
        coverId: new BN(coverId),
        coverProductId: new BN(productId),
        coverDurationInDays: new BN(days),
        coverCurrency: this.address.auwt.mint,
        coverAmount: coverAmount,
        coverOwner: owner,
        coverReferrer: referrer,
      },
      accounts: {
        buyer: owner,
        individualPoolState: accounts.poolStatePda,
        productState: accounts.productStatePda,
        quotationState: accounts.quotationStatePda,
        quotationProgram: this.address.Quotation.program,
        quotationMetadataState: this.address.Quotation.state,
        quotationResultState: this.address.Quotation.result,
        programMetadataState: this.address.Underwrite.state,
        underwritingCallerAuthPda: this.address.Underwrite.callerAuthPda,
        premiumPoolAccountPda: this.address.premiumPoolAccountPda,
        poolProgram: this.address.Pool.program,
        poolMetadataState: this.address.Pool.state,
        auwtProgram: this.address.Auwt.program,
        auwtState: this.address.Auwt.state,
        coverProgram: this.address.Cover.program,
        coverMetadataState: this.address.Cover.state,
        coverState: coverStatePda,
        nftAta: nftAta,
        nftMetadataState: nftMetadataState,
        sysvarClock: PublicKeys.SysvarClock,
        systemProgram: PublicKeys.SystemProgram,
      },
    }).instruction();

    return new SendTransactionParam()
      .mergeTx(setComputeBudgetInstruction(400000))
      .mergeTx(instruction);
  }

  public async stakeSolAuwt(param: api.StakeSolForAuwtParam): Promise<SendTransactionParam> {
    const { staker, stakeAmount } = param;

    const program = this.programManager.getSplStakingProgram();

    const instance = this.getStakingInstanceBySplTokenOrThrow(this.address.amtsol.mint.toString());

    const tempAmtsolTaKeypair = Keypair.generate();

    // Do not need to create the associated token account here because it will be created by the
    // instruction.
    const ataAuwt = await findAta(this.address.auwt.mint, staker);

    const instruction = await program.mintFromSolToAuwt({
      param: {
        solAmount: stakeAmount,
      },
      accounts: {
        depositor: staker,
        auwtTokenTransferTo: ataAuwt,
        amtsolTempTokenAccount: tempAmtsolTaKeypair.publicKey,
        amtsolMint: this.address.amtsol.mint,
        auwtMint: this.address.auwt.mint,
        auwtMintAuthPda: this.address.auwt.mintAuthPda,
        auwtProgram: this.address.Auwt.program,
        auwtState: this.address.Auwt.state,
        exchangeRateGroupState: this.address.programGroupMainState,
        splSolStakingCallerPda: this.address.SplStaking.callerPda,
        amuletSolStakingProgram: this.address.SolStaking.program,
        solstakingProgramMetadataState: this.address.SolStaking.state,
        solstakingProgramPosState: this.address.programPosState,
        solstakingProgramPosSolPda: this.address.programPosSolPda,
        solstakingProgramLiqSolPda: this.address.programLiqSolPda,
        solstakingProgramLiqAmtsol: this.address.programLiqAmtsol,
        solstakingProgramAuthPda: this.address.programAuthPda,
        splstakingProgramSummaryState: this.address.programSummaryState,
        splstakingProgramStakingInstanceState: instance.state,
        splstakingProgramStakedSplTa: instance.splTa,
        splstakingProgramLiqStakedSplTa: instance.liqSplTa,
        splstakingProgramLiqAuwtTa: instance.liqAuwtTa,
        splstakingProgramLiqAuwtTaAuthPda: instance.liqAuwtTaAuthPda,
        tokenProgram: PublicKeys.TokenProgram,
        associatedTokenProgram: PublicKeys.AssociatedTokenProgram,
        systemProgram: PublicKeys.SystemProgram,
        sysvarRent: PublicKeys.SysvarRent,
      },
    }).instruction();

    return new SendTransactionParam()
      .mergeTx(setComputeBudgetInstruction(400000))
      .mergeTx(instruction, [tempAmtsolTaKeypair]);
  }

  public async redeemAuwtSplDelayed(param: api.RedeemAuwtDelayedParam & {
    ticketAccount: Signer;
    tokenOut: PublicKey;
  }): Promise<SendTransactionParam> {
    const { staker, redeemAmount, ticketAccount, tokenOut } = param;

    const program = this.programManager.getSplStakingProgram();

    const instance = this.getStakingInstanceBySplTokenOrThrow(tokenOut.toString());

    const ataAuwt = await findAta(this.address.auwt.mint, staker);

    const instruction = await program.submitWithdrawTicket({
      param: {
        auwtAmount: redeemAmount,
      },
      accounts: {
        auwtBurnFromAuth: staker,
        auwtBurnFromTa: ataAuwt,
        newTicketState: ticketAccount.publicKey,
        exchangeRateGroupState: this.address.programGroupMainState,
        programSummaryState: this.address.programSummaryState,
        programStakingInstanceState: instance.state,
        auwtState: this.address.Auwt.state,
        auwtProgram: this.address.Auwt.program,
        splSolStakingCallerPda: this.address.SplStaking.callerPda,
        auwtMint: this.address.auwt.mint,
        sysvarClock: PublicKeys.SysvarClock,
        systemProgram: PublicKeys.SystemProgram,
        sysvarRent: PublicKeys.SysvarRent,
        tokenProgram: PublicKeys.TokenProgram,
      },
    }).instruction();

    return new SendTransactionParam(instruction, [ticketAccount]);
  }

  public async ticketAccountWithdraw(param: api.WithdrawTicketAccountParam & {
    tokenOut: PublicKey;
  }): Promise<SendTransactionParam> {
    const { staker, ticketAccount, tokenOut } = param;

    const program = this.programManager.getSplStakingProgram();

    const instance = this.getStakingInstanceBySplTokenOrThrow(tokenOut.toString());

    const [ataSpl, paramAtaSpl] = await getOrCreateAta(this.connection, instance.splMint, staker);

    const instruction = await program.claimSplTokenFromTicket({
      accounts: {
        withdrawAuth: staker,
        splTokenTransferTo: ataSpl,
        withdrawTicketState: ticketAccount,
        programSummaryState: this.address.programSummaryState,
        programStakingInstanceState: instance.state,
        programStakedSplTa: instance.splTa,
        programStakedSplTaAuthPda: instance.splTaAuthPda,
        sysvarClock: PublicKeys.SysvarClock,
        sysvarRent: PublicKeys.SysvarRent,
        tokenProgram: PublicKeys.TokenProgram,
      },
    }).instruction();

    return new SendTransactionParam()
      .merge(paramAtaSpl)
      .mergeTx(instruction);
  }

  private findCoverStatePda(coverId: string) {
    return findPda(this.address.Cover.program, [this.address.Cover.state, 'cover_account_seed', coverId]);
  }

  private findNftMetadataPda(nftTokenMint: PublicKey) {
    // The NFT token metadata is based on Metaplex standard.
    // https://docs.metaplex.com/programs/token-metadata/accounts#metadata
    const metaplexProgramId = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

    return findPda(metaplexProgramId, ['metadata', metaplexProgramId, nftTokenMint]);
  }

  private getProductAccountsOrThrow(productId: number) {
    const productAccounts = this.address.products[productId];

    if (productAccounts == null) {
      throw new AmuletError(`No product accounts found for product ${productId}.`);
    }

    return productAccounts;
  }

  private getStakingInstanceBySplTokenOrThrow(addressSpl: string) {
    const instance = this.address.stakingInstances[addressSpl];

    if (instance == null) {
      throw new AmuletError(`No staking instance found for SPL token ${addressSpl}.`);
    }

    return instance;
  }
}
