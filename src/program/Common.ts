// Generated by "npm run codegen". Do not modify this file manually.
/* eslint-disable @typescript-eslint/indent */
export type InstructionOption<P = any, Q = any> = P extends void
  ? {
      readonly accounts: Q;
    }
  : {
      readonly param: P;
      readonly accounts: Q;
    };
