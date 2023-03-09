import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Amulet, Mode } from '../src';

export function createAmulet() {
  return new Amulet({
    mode: Mode.Devnet,
    connection: new Connection(clusterApiUrl('devnet')),
    apiSecret: process.env.AMULET_API_SECRET,
  });
}
