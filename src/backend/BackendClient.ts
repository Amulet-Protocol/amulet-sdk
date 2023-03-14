import type { GetPremiumParam, SimulationParam, SimulationResult } from '../entity';
import type { GetPremiumData, SimulateData } from './BackendClientType';

import { BN } from '@project-serum/anchor';
import { HttpClient } from '../http';

export type BackendClientConfig = {
  url: string;
  code: string;
};

export class BackendClient {
  private readonly client: HttpClient;

  public constructor(config: BackendClientConfig) {
    this.client = new HttpClient({
      url: config.url,
      params: {
        code: config.code,
      },
    });
  }

  public async simulate(body: SimulationParam): Promise<SimulationResult> {
    const data = await this.client.post<SimulateData, SimulationParam>('/simulateTransaction', body, {
      validateStatus: (status) => status < 500,
    });

    return {
      logs: data.logs ?? data.simulationResponse?.logs ?? [],
    };
  }

  public async getPremium(param: GetPremiumParam) {
    const body = {
      productId: param.productId,
      coverDurationInDays: param.days,
      coverAmount: param.coverAmount.toNumber(),
      nftMint: param.nftMint?.toString(),
    };

    const data = await this.client.post<GetPremiumData, typeof body>('/quotation', body);

    return {
      premium: new BN(data.premium_amount),
    };
  }
}
