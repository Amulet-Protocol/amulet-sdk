import type {
  AddressConfig,
  BuyCoverParam,
  GetPremiumParam,
  StakeSolForAuwtParam,
} from '../entity';

import { BN } from '@project-serum/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { AmuletError, SendTransactionParam } from '../entity';
import { findAta, findPda, setComputeBudgetInstruction } from './BlockchainUtil';
import { ProgramManager } from './ProgramManager';
import { PublicKeys } from './PublicKeys';

export class BlockchainClient {
  private readonly address: AddressConfig;
  private readonly programManager: ProgramManager;

  public constructor(address: AddressConfig) {
    this.address = address;
    this.programManager = new ProgramManager(this.address);
  }

  public async premiumGet(param: GetPremiumParam): Promise<SendTransactionParam> {
    const { provider, productId, coverToken, coverAmount, days, nftMetadataAddress } = param;

    const program = this.programManager.getQuotationProgram(provider);

    const accounts = this.getProductAccountsOrThrow(productId);

    const nftMetadataState = nftMetadataAddress ?? PublicKey.default;

    const instruction = await program.getPremium({
      param: {
        productId: new BN(productId),
        coverDurationInDays: new BN(days),
        coverCurrency: coverToken,
        coverAmount: coverAmount,
      },
      accounts: {
        individualPoolState: accounts.poolStatePda,
        productState: accounts.productStatePda,
        quotationState: accounts.quotationStatePda,
        quotationResultState: this.address.Quotation.result,
        programMetadataState: this.address.Quotation.state,
        poolMetadataState: this.address.Pool.state,
        auwtState: this.address.Auwt.state,
        nftMetadataState: nftMetadataState,
      },
    }).instruction();

    return new SendTransactionParam(instruction);
  }

  public async coverBuy(param: BuyCoverParam & {
    coverId: string;
  }): Promise<SendTransactionParam> {
    const {
      provider, owner, referrer, productId, coverId, coverToken, coverAmount, days, nftMint,
      nftMetadataAddress,
    } = param;

    const program = this.programManager.getUnderwritingProgram(provider);

    const accounts = this.getProductAccountsOrThrow(productId);

    const [coverStatePda] = this.findCoverStatePda(coverId);
    const nftAta = (nftMint == null) ? PublicKey.default : await findAta(nftMint, owner);
    const nftMetadataState = nftMetadataAddress ?? PublicKey.default;

    const instruction = await program.buyCover({
      param: {
        coverId: new BN(coverId),
        coverProductId: new BN(productId),
        coverDurationInDays: new BN(days),
        coverCurrency: coverToken,
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

  public async stakeSolAuwt(param: StakeSolForAuwtParam): Promise<SendTransactionParam> {
    const { provider, staker, stakeAmount } = param;

    const program = this.programManager.getSplStakingProgram(provider);

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

  private findCoverStatePda(coverId: string) {
    return findPda(this.address.Cover.program, [this.address.Cover.state, 'cover_account_seed', coverId]);
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
