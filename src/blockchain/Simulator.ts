import type { Signer, Transaction } from '@solana/web3.js';
import type { BackendClient } from '../backend';
import type { GetPremiumParam, SimulationResult } from '../entity';
import type { BlockchainClient } from './BlockchainClient';
import type { GetPremiumSimulationData as GetPremiumSimulationData } from './SimulatorType';

import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { AmuletError, InsufficientCapacityError } from '../entity';
import { containsIgnoreCase } from '../util';

function parseLog<T>(logs: string[], eventName: string): [T, null] | [null, Error] {
  const log = logs.find((item) => item.includes(eventName));

  if (log == null) {
    return [null, new AmuletError(`Failed to find log with event name ${eventName} from logs.\n${logs.join('\n')}`)];
  }

  try {
    return [JSON.parse(log.replace(/^Program log:/, '')) as T, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export class Simulator {
  private readonly backendClient: BackendClient;
  private readonly blockchainClient: BlockchainClient;

  public constructor(backendClient: BackendClient, blockchainClient: BlockchainClient) {
    this.backendClient = backendClient;
    this.blockchainClient = blockchainClient;
  }

  public async simulate(wallet: PublicKey, transaction: Transaction, signers: Signer[]): Promise<SimulationResult> {
    const payload = {
      wallet: wallet.toString(),
      instructions: transaction.instructions.map((item) => ({
        programId: item.programId.toString(),
        keys: item.keys.map((key) => ({
          pubkey: key.pubkey.toString(),
          isSigner: key.isSigner,
          isWritable: key.isWritable,
        })),
        data: item.data.toString('hex'),
      })),
      signers: signers.map((signer) => Buffer.from(signer.secretKey).toString('base64')),
    };

    return this.backendClient.simulate(payload);
  }

  public async premiumGet(param: GetPremiumParam) {
    const { wallet, productId } = param;

    const result = await this.blockchainClient.premiumGet(param);

    const { logs } = await this.simulate(wallet, result.transaction, result.signers);

    const log = logs.find((item) => containsIgnoreCase(item, 'ValidationInsufficientCapacityAmount'));

    if (log != null) {
      throw new InsufficientCapacityError(`Insufficient capacity for product ${productId}.`);
    }

    const [data, error] = parseLog<GetPremiumSimulationData>(logs, 'get_premium');

    if (error != null) {
      throw error;
    }

    return {
      premiumToken: new PublicKey(data.currency),
      premium: new BN(data.amount),
    };
  }
}
