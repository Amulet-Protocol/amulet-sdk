export type MetaProgramsRawAddress = {
  auwtMintAuthPda: string;
  auwtState: string;
  programPosSolPda: string;
  programPosState: string;
  programLiqSolPda: string;
  programLiqAmtsol: string;
  programAuthPda: string;
  programGroupMainState: string;
  programSummaryState: string;
  premiumPoolAccountPda: string;
  solStakingMetadataState: string;
  splSolStakingCallerPda: string;
  poolProgramMetadataState: string;
  poolCpiAuthPda: string;
  underwritingProgramMetadataState: string;
  underwritingCallerAuthPda: string;
  quotationProgramMetadataState: string;
  quotationResultState: string;
  coverProgramMetadataState: string;
  token: {
    amtsolMint: string;
    lpSolAmtsolMint: string;
    auwtMint: string;
  };
  Programs: {
    AmuletSolStakingProgram: string;
    AuwtTokenProgram: string;
    CoverProgram: string;
    PoolProgram: string;
    QuotationProgram: string;
    SplSolStakingProgram: string;
    UnderwritingProgram: string;
  };
  stakingInstance: {
    [key: string]: {
      programStakingInstanceState: string;
      programStakedSplMint: string;
      programStakedSplTa: string;
      programStakedSplTaAuthPda: string;
      programLiqStakedSplTa: string;
      programLiqAuwtTaAuthPda: string;
      programLiqAuwtTa: string;
    };
  };
  products: {
    [productId: string]: {
      productStatePda: string;
      quotationStatePda: string;
      individualPoolStatePda: string;
      individualPoolLpAuwtMint: string;
      individualPoolLpAuwtMintAuthPda: string;
      individualPoolAuwtTokenAccount: string;
    };
  };
  lookupTable: string;
};
