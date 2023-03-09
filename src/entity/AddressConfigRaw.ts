type TokenAsset = {
  pcuvTokenAccount: string;
};

type MultisigRawAddress = {
  multisigInstance: string;
  multisigSigner: string;
};

export type MetaProgramsRawAddress = {
  multisig: {
    programId: string;
    adminMultisig: MultisigRawAddress;
    exhangeRateMultisig: MultisigRawAddress;
    opsMultisig: MultisigRawAddress;
    claimOpsMultisig: MultisigRawAddress;
  };
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
  pcuvProgramMetadataState: string;
  pcuvSolPda: string;
  solStakingMetadataState: string;
  splSolStakingCallerPda: string;
  poolProgramMetadataState: string;
  poolCpiAuthPda: string;
  auwtPoolAuthPda: string;
  underwritingProgramMetadataState: string;
  underwritingCallerAuthPda: string;
  productProgramMetadataState: string;
  quotationProgramMetadataState: string;
  quotationResultState: string;
  coverProgramMetadataState: string;
  claimProgramMetadataState: string;
  claimProgramCallerAuthPda: string;
  claimProgramSolPda: string;
  claimProgramAwtAccount: string;
  token: {
    amtsolMint: string;
    lpSolAmtsolMint: string;
    auwtMint: string;
  };
  tokenAssets: {
    amtsolMint: TokenAsset;
    lpSolAmtsolMint: TokenAsset;
    auwtMint: TokenAsset;
  };
  Programs: {
    AmuletSolStakingProgram: string;
    AuwtTokenProgram: string;
    ClaimProgram: string;
    CoverProgram: string;
    ExchangeRateProgram: string;
    PcuvAssetsProgram: string;
    PoolProgram: string;
    ProductProgram: string;
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
      programLiqStakedSplTaAuthPda: string;
      programLiqAuwtTa: string;
      programLiqAuwtTaAuthPda: string;
      lpMint: string;
      lpMintAuthPda: string;
      pcuvStakedSplTa: string;
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
};
