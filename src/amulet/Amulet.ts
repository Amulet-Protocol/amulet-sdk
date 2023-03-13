import type { Connection } from '@solana/web3.js';
import type { Config } from '../config';
import type {
  BuyCoverParam,
  CreateTransactionResult,
  GetPremiumParam,
  GetPremiumResult,
  Tokens,
} from '../entity';

import { PublicKey } from '@solana/web3.js';
import { BackendClient } from '../backend';
import { BlockchainClient, BlockchainReader, Simulator } from '../blockchain';
import { ConfigDevnet, ConfigMainnet } from '../config';
import { Mode } from '../entity';

export type AmuletConfig = {
  mode: Mode;
  connection: Connection;
};

export class Amulet {
  public mode: Mode;
  public tokens: Tokens;

  private config: Config;
  private backendClient: BackendClient;
  private blockchainClient: BlockchainClient;
  private simulator: Simulator;
  private blockchainReader: BlockchainReader;

  public constructor(option: AmuletConfig) {
    this.mode = option.mode;

    this.config = (this.mode === Mode.Mainnet) ? ConfigMainnet : ConfigDevnet;

    this.blockchainReader = new BlockchainReader(option.connection, this.config.address);
    this.blockchainClient = new BlockchainClient(this.config.address);
    this.backendClient = new BackendClient(this.config.backend);
    this.simulator = new Simulator(this.backendClient, this.blockchainClient);

    this.tokens = {
      sol: {
        publicKey: new PublicKey('So11111111111111111111111111111111111111112'),
      },
      auwt: {
        publicKey: this.config.address.auwt.mint,
      },
    };
  }

  public getPremium(param: GetPremiumParam): Promise<GetPremiumResult> {
    return this.simulator.premiumGet(param);
  }

  public async buyCover(param: BuyCoverParam): Promise<CreateTransactionResult> {
    const info = await this.blockchainReader.getCoverAccountInfo();

    const coverId = (info.coverCount + 1).toString();

    return this.blockchainClient.coverBuy({
      ...param,
      coverId,
    });
  }
}
