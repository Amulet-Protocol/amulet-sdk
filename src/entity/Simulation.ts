export type SimulationParam = {
  readonly wallet: string; // User wallet public key in Base58.
  readonly instructions: {
    readonly programId: string; // Public key in Base58.
    readonly data: string; // Hexadecimal string.
    readonly keys: {
      readonly pubkey: string; // Public key in Base58.
      readonly isSigner: boolean;
      readonly isWritable: boolean;
    }[];
  }[];
  readonly signers: string[]; // Private keys in Base64.
};

export type SimulationResult = {
  readonly logs: string[];
};
