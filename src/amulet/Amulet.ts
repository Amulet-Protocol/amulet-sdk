import type { Connection } from '@solana/web3.js';
import type { Config } from '../config';
import type { TokenDefinition } from '../entity';
import type * as api from '../entity/Api';

import { Keypair } from '@solana/web3.js';
import { BackendClient } from '../backend';
import { BlockchainClient, BlockchainReader, ErrorParser } from '../blockchain';
import { ConfigDevnet, ConfigMainnet } from '../config';
import { AmuletError, Mode } from '../entity';
import { validate } from '../util';

export type AmuletConfig = {
  mode: Mode;
  connection: Connection;
};

export class Amulet {
  public mode: Mode;
  public connection: Connection;
  public tokens: TokenDefinition;
  public errorParser: ErrorParser;

  private config: Config;
  private backendClient: BackendClient;
  private blockchainClient: BlockchainClient;
  private blockchainReader: BlockchainReader;

  public constructor(option: AmuletConfig) {
    this.mode = option.mode;
    this.connection = option.connection;
    this.errorParser = new ErrorParser();

    this.config = (this.mode === Mode.Mainnet) ? ConfigMainnet : ConfigDevnet;

    this.blockchainReader = new BlockchainReader(this.connection, this.config.address);
    this.blockchainClient = new BlockchainClient(this.connection, this.config.address);
    this.backendClient = new BackendClient(this.config.backend);

    this.tokens = {
      auwt: {
        publicKey: this.config.address.auwt.mint,
      },
      amtsol: {
        publicKey: this.config.address.amtsol.mint,
      },
    };
  }

  public getPremium(param: api.GetPremiumParam): Promise<api.GetPremiumResult> {
    validate(Number.isInteger(param.productId) && param.productId > 0, new AmuletError('productId must be a positive integer.'));
    validate(!param.coverAmount.isZero() && !param.coverAmount.isNeg(), new AmuletError('coverAmount must be a positive BN.'));
    validate(Number.isInteger(param.days) && param.days > 0, new AmuletError('days must be a positive integer.'));

    return this.backendClient.getPremium(param);
  }

  public async buyCover(param: api.BuyCoverParam): Promise<api.CreateTransactionResult> {
    validate(Number.isInteger(param.productId) && param.productId > 0, new AmuletError('productId must be a positive integer.'));
    validate(!param.coverAmount.isZero() && !param.coverAmount.isNeg(), new AmuletError('coverAmount must be a positive BN.'));
    validate(Number.isInteger(param.days) && param.days > 0, new AmuletError('days must be a positive integer.'));

    const info = await this.blockchainReader.getCoverAccountInfo();

    const coverId = (info.coverCount + 1).toString();

    return this.blockchainClient.coverBuy({
      ...param,
      coverId,
    });
  }

  public stakeSolForAuwt(param: api.StakeSolForAuwtParam): Promise<api.CreateTransactionResult> {
    validate(!param.stakeAmount.isZero() && !param.stakeAmount.isNeg(), new AmuletError('stakeAmount must be a positive BN.'));

    return this.blockchainClient.stakeSolAuwt(param);
  }

  public async redeemAuwtForAmtsolDelayed(param: api.RedeemAuwtDelayedParam): Promise<api.RedeemAuwtDelayedResult> {
    validate(!param.redeemAmount.isZero() && !param.redeemAmount.isNeg(), new AmuletError('redeemAmount must be a positive BN.'));

    const ticketAccount = Keypair.generate();

    const result = await this.blockchainClient.redeemAuwtSplDelayed({
      ...param,
      ticketAccount,
      tokenOut: this.tokens.amtsol.publicKey,
    });

    return {
      ...result.toObject(),
      ticketAccount: ticketAccount.publicKey,
    };
  }

  public withdrawAmtsolTicketAccount(param: api.WithdrawTicketAccountParam): Promise<api.CreateTransactionResult> {
    return this.blockchainClient.ticketAccountWithdraw({
      ...param,
      tokenOut: this.tokens.amtsol.publicKey,
    });
  }
}
