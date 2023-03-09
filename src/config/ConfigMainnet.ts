import type { Config } from './Config';

import addressRaw from '../address/mainnet-solana-meta-programs.json';
import { extractAddress } from '../entity';

export const ConfigMainnet: Config = {
  address: extractAddress(addressRaw),
  backend: {
    url: 'https://info.amulet.org',
    code: '',
  },
};
