import type { SimulationParam, SimulationResult } from '../entity';
import type { SimulateData } from './BackendClientType';

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
}
