import type { Config } from './Config';

import addressRaw from '../address/devnet-solana-meta-programs.json';
import { extractAddress } from '../entity';

export const ConfigDevnet: Config = {
  address: extractAddress(addressRaw),
  backend: {
    url: 'https://amd-fa-api-info-dev-1.azurewebsites.net',
    code: '',
  },
};
