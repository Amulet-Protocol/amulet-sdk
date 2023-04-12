import type { MetaProgramsRawAddress } from './AddressConfigRaw';

import { PublicKey } from '@solana/web3.js';

export type AddressConfig = {
  readonly amtsol: {
    readonly mint: PublicKey;
  };
  readonly auwt: {
    readonly mint: PublicKey;
    readonly mintAuthPda: PublicKey;
  };
  readonly lpSolAmtsol: {
    readonly mint: PublicKey;
  };
  readonly programPosSolPda: PublicKey;
  readonly programPosState: PublicKey;
  readonly programLiqSolPda: PublicKey;
  readonly programLiqAmtsol: PublicKey;
  readonly programAuthPda: PublicKey;
  readonly programGroupMainState: PublicKey;
  readonly programSummaryState: PublicKey;
  readonly premiumPoolAccountPda: PublicKey;
  readonly Auwt: {
    readonly program: PublicKey;
    readonly state: PublicKey;
  };
  readonly SolStaking: {
    readonly program: PublicKey;
    readonly state: PublicKey;
  };
  readonly SplStaking: {
    readonly program: PublicKey;
    readonly callerPda: PublicKey;
  };
  readonly Pool: {
    readonly program: PublicKey;
    readonly state: PublicKey;
    readonly cpiAuthPda: PublicKey;
  };
  readonly Underwrite: {
    readonly program: PublicKey;
    readonly state: PublicKey;
    readonly callerAuthPda: PublicKey;
  };
  readonly Quotation: {
    readonly program: PublicKey;
    readonly state: PublicKey;
    readonly result: PublicKey;
  };
  readonly Cover: {
    readonly program: PublicKey;
    readonly state: PublicKey;
  };
  readonly stakingInstances: {
    readonly [address: string]: {
      readonly key: string;
      readonly splMint: PublicKey;
      readonly splTa: PublicKey;
      readonly splTaAuthPda: PublicKey;
      readonly state: PublicKey;
      readonly liqSplTa: PublicKey;
      readonly liqAuwtTa: PublicKey;
      readonly liqAuwtTaAuthPda: PublicKey;
    };
  };
  readonly products: {
    readonly [productId: string]: {
      readonly productStatePda: PublicKey;
      readonly quotationStatePda: PublicKey;
      readonly poolStatePda: PublicKey;
      readonly poolLpMint: PublicKey;
      readonly poolLpMintAuthPda: PublicKey;
      readonly poolAuwtTa: PublicKey;
    };
  };
};

export const DEFAULT_ADDRESS_CONFIG: AddressConfig = {
  amtsol: {
    mint: PublicKey.default,
  },
  auwt: {
    mint: PublicKey.default,
    mintAuthPda: PublicKey.default,
  },
  lpSolAmtsol: {
    mint: PublicKey.default,
  },
  programPosSolPda: PublicKey.default,
  programPosState: PublicKey.default,
  programLiqSolPda: PublicKey.default,
  programLiqAmtsol: PublicKey.default,
  programAuthPda: PublicKey.default,
  programGroupMainState: PublicKey.default,
  programSummaryState: PublicKey.default,
  premiumPoolAccountPda: PublicKey.default,
  Auwt: {
    program: PublicKey.default,
    state: PublicKey.default,
  },
  SolStaking: {
    program: PublicKey.default,
    state: PublicKey.default,
  },
  SplStaking: {
    program: PublicKey.default,
    callerPda: PublicKey.default,
  },
  Pool: {
    program: PublicKey.default,
    state: PublicKey.default,
    cpiAuthPda: PublicKey.default,
  },
  Underwrite: {
    program: PublicKey.default,
    state: PublicKey.default,
    callerAuthPda: PublicKey.default,
  },
  Quotation: {
    program: PublicKey.default,
    state: PublicKey.default,
    result: PublicKey.default,
  },
  Cover: {
    program: PublicKey.default,
    state: PublicKey.default,
  },
  stakingInstances: {},
  products: {},
};

export function extractAddress(
  addressMeta: MetaProgramsRawAddress,
): AddressConfig {
  return {
    amtsol: {
      mint: new PublicKey(addressMeta.token.amtsolMint),
    },
    auwt: {
      mint: new PublicKey(addressMeta.token.auwtMint),
      mintAuthPda: new PublicKey(addressMeta.auwtMintAuthPda),
    },
    lpSolAmtsol: {
      mint: new PublicKey(addressMeta.token.lpSolAmtsolMint),
    },
    programPosSolPda: new PublicKey(addressMeta.programPosSolPda),
    programPosState: new PublicKey(addressMeta.programPosState),
    programLiqSolPda: new PublicKey(addressMeta.programLiqSolPda),
    programLiqAmtsol: new PublicKey(addressMeta.programLiqAmtsol),
    programAuthPda: new PublicKey(addressMeta.programAuthPda),
    programGroupMainState: new PublicKey(addressMeta.programGroupMainState),
    programSummaryState: new PublicKey(addressMeta.programSummaryState),
    premiumPoolAccountPda: new PublicKey(addressMeta.premiumPoolAccountPda),
    Auwt: {
      program: new PublicKey(addressMeta.Programs.AuwtTokenProgram),
      state: new PublicKey(addressMeta.auwtState),
    },
    SolStaking: {
      program: new PublicKey(addressMeta.Programs.AmuletSolStakingProgram),
      state: new PublicKey(addressMeta.solStakingMetadataState),
    },
    SplStaking: {
      program: new PublicKey(addressMeta.Programs.SplSolStakingProgram),
      callerPda: new PublicKey(addressMeta.splSolStakingCallerPda),
    },
    Pool: {
      program: new PublicKey(addressMeta.Programs.PoolProgram),
      state: new PublicKey(addressMeta.poolProgramMetadataState),
      cpiAuthPda: new PublicKey(addressMeta.poolCpiAuthPda),
    },
    Underwrite: {
      program: new PublicKey(addressMeta.Programs.UnderwritingProgram),
      state: new PublicKey(addressMeta.underwritingProgramMetadataState),
      callerAuthPda: new PublicKey(addressMeta.underwritingCallerAuthPda),
    },
    Quotation: {
      program: new PublicKey(addressMeta.Programs.QuotationProgram),
      state: new PublicKey(addressMeta.quotationProgramMetadataState),
      result: new PublicKey(addressMeta.quotationResultState),
    },
    Cover: {
      program: new PublicKey(addressMeta.Programs.CoverProgram),
      state: new PublicKey(addressMeta.coverProgramMetadataState),
    },
    stakingInstances: Object.entries(addressMeta.stakingInstance).reduce<AddressConfig['stakingInstances']>((previous, [key, item]) => {
      return {
        ...previous,
        [item.programStakedSplMint]: {
          key,
          splMint: new PublicKey(item.programStakedSplMint),
          splTa: new PublicKey(item.programStakedSplTa),
          splTaAuthPda: new PublicKey(item.programStakedSplTaAuthPda),
          state: new PublicKey(item.programStakingInstanceState),
          liqSplTa: new PublicKey(item.programLiqStakedSplTa),
          liqAuwtTa: new PublicKey(item.programLiqAuwtTa),
          liqAuwtTaAuthPda: new PublicKey(item.programLiqAuwtTaAuthPda),
        },
      };
    }, {}),
    products: Object.entries(addressMeta.products).reduce<AddressConfig['products']>((previous, [productId, item]) => {
      return {
        ...previous,
        [productId]: {
          productStatePda: new PublicKey(item.productStatePda),
          quotationStatePda: new PublicKey(item.quotationStatePda),
          poolStatePda: new PublicKey(item.individualPoolStatePda),
          poolLpMint: new PublicKey(item.individualPoolLpAuwtMint),
          poolLpMintAuthPda: new PublicKey(item.individualPoolLpAuwtMintAuthPda),
          poolAuwtTa: new PublicKey(item.individualPoolAuwtTokenAccount),
        },
      };
    }, {}),
  };
}
