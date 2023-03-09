import type { Idl } from '@project-serum/anchor';

import { ProgramError } from '../entity';
import { regexCapture } from '../util';
import { AppIdl } from './Idl';

function getIdlErrorCode(message: string) {
  const codeHex = regexCapture(message, new RegExp('custom program error: (0x[0-9a-f]+)'));

  return (codeHex == null) ? null : parseInt(codeHex);
}

function getIdlError(code: number, idl: Idl) {
  return idl.errors?.find((item) => item.code === code);
}

function parseProgramError(error: any, idl: Idl) {
  const code = getIdlErrorCode(error?.message ?? '');

  if (code == null) {
    return null;
  }

  const idlError = getIdlError(code, idl);

  if (idlError != null) {
    return new ProgramError({
      message: idlError.msg ?? '',
      code: idlError.code.toString(),
    });
  }

  return null;
}

export class ErrorParser {
  public parseBuyCoverError(error: any): ProgramError | null {
    return parseProgramError(error, AppIdl.Underwriting);
  }

  public parseStakeSolForAuwtError(error: any): ProgramError | null {
    return parseProgramError(error, AppIdl.SplStaking);
  }
}
