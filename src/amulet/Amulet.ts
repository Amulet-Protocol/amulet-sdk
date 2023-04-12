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

/**
 * Amulet config object.
 * @property mode Amulet environment.
 * @property connection Solana connection provider.
 * @interface
 */
export type AmuletConfig = {
  mode: Mode;
  connection: Connection;
};

/**
 * Amulet class contains the function to interact with the Amulet protocol Dapp.
 * 
 * @see {@link https://amulet.org}
 */
export class Amulet {
  public mode: Mode;
  public connection: Connection;
  public tokens: TokenDefinition;
  public errorParser: ErrorParser;

  private config: Config;
  private backendClient: BackendClient;
  private blockchainClient: BlockchainClient;
  private blockchainReader: BlockchainReader;

  /**
   * Create Amulet instance.
   * 
   * @param option The amulet config specifies the network environment.
   * 
   */
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

  /**
   * Calculate the total premium amount that needs to be paid for a product with respect
   * to the cover duration and cover amount.
   *
   * @param param - The get premium parameter object.
   * @returns The premium amount.
   */
  public getPremium(param: api.GetPremiumParam): Promise<api.GetPremiumResult> {
    validate(Number.isInteger(param.productId) && param.productId > 0, new AmuletError('productId must be a positive integer.'));
    validate(!param.coverAmount.isZero() && !param.coverAmount.isNeg(), new AmuletError('coverAmount must be a positive BN.'));
    validate(Number.isInteger(param.days) && param.days > 0, new AmuletError('days must be a positive integer.'));

    return this.backendClient.getPremium(param);
  }

  /**
   * Purchase a product cover with the input of cover duration and cover amount.
   *
   * @param param - The buy cover parameter object.
   * @returns The transaction result.
   */
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

  /**
   * Swaping SOL with aUWT with earning yield from staking and underwriting.
   *
   * @param param - The staking parameter object.
   * @returns The transaction result.
   */
  public stakeSolForAuwt(param: api.StakeSolForAuwtParam): Promise<api.CreateTransactionResult> {
    validate(!param.stakeAmount.isZero() && !param.stakeAmount.isNeg(), new AmuletError('stakeAmount must be a positive BN.'));

    return this.blockchainClient.stakeSolAuwt(param);
  }

  /**
   * Swapping aUWT for amtSOL by delayed unstaking. 
   * A ticket receipt will be generated and transferred to the token account.
   * The ticket can only be used to withdraw amtSOL after a waiting period.
   *
   * @param param - The redeem aUWT parameter object.
   * @returns The transaction result.
   */
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

  /**
   * Withdraw amtSOL with the ticket receipt.
   *
   * @param param - The ticket withdrawal parameter object.
   * @returns The transaction result.
   */
  public withdrawAmtsolTicketAccount(param: api.WithdrawTicketAccountParam): Promise<api.CreateTransactionResult> {
    return this.blockchainClient.ticketAccountWithdraw({
      ...param,
      tokenOut: this.tokens.amtsol.publicKey,
    });
  }
}
