import type { BackendClientConfig } from '../backend';
import type { AddressConfig } from '../entity';

export type Config = {
  address: AddressConfig;
  backend: BackendClientConfig;
};
