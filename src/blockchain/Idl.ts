import type { Idl } from '@coral-xyz/anchor';

import Cover from '../idl/cover.json';
import Pool from '../idl/pool.json';
import Quotation from '../idl/quotation.json';
import SplStaking from '../idl/spl_sol_staking.json';
import Underwriting from '../idl/underwriting.json';

export const AppIdl = {
  SplStaking: SplStaking as Idl,
  Pool: Pool as Idl,
  Quotation: Quotation as Idl,
  Underwriting: Underwriting as Idl,
  Cover: Cover as Idl,
};
