import type { Idl } from '@project-serum/anchor';

import SolStaking from '../idl/amulet_sol_staking.json';
import Cover from '../idl/cover.json';
import Pool from '../idl/pool.json';
import Product from '../idl/product.json';
import Quotation from '../idl/quotation.json';
import SplStaking from '../idl/spl_sol_staking.json';
import Underwriting from '../idl/underwriting.json';

export const AppIdl = {
  SolStaking: SolStaking as Idl,
  SplStaking: SplStaking as Idl,
  Pool: Pool as Idl,
  Quotation: Quotation as Idl,
  Underwriting: Underwriting as Idl,
  Product: Product as Idl,
  Cover: Cover as Idl,
};
