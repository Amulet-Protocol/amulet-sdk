import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { Pathname } from '../entity';

export default function Nav() {
  return (
    <div>
      <WalletMultiButton />
      <p>
        <Link to={Pathname.BuyCover}>Buy Cover</Link>
      </p>
      <p>
        <Link to={Pathname.StakeSolForAuwt}>Stake SOL for aUWT</Link>
      </p>
      <p>
        <Link to={Pathname.RedeemAuwtForAmtsolDelayed}>Redeem aUWT for amtSOL delayed</Link>
      </p>
      <p>
        <Link to={Pathname.WithdrawAmtsolTicketAccount}>Withdraw amtSOL ticket account</Link>
      </p>
    </div>
  );
}
