import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Pathname } from '../entity';
import BuyCoverPage from './BuyCoverPage';
import Nav from './Nav';
import RedeemAuwtForAmtsolDelayedPage from './RedeemAuwtForAmtsolDelayedPage';
import StakeSolForAuwtPage from './StakeSolForAuwtPage';
import WithdrawAmtsolTicketAccountPage from './WithdrawAmtsolTicketAccountPage';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.App}>
      <Nav />
      <div>
        <Suspense fallback={<div />}>
          <Routes>
            <Route path="/" element={<Navigate to={Pathname.BuyCover} />} />
            <Route path={Pathname.BuyCover} element={<BuyCoverPage />} />
            <Route path={Pathname.StakeSolForAuwt} element={<StakeSolForAuwtPage />} />
            <Route path={Pathname.RedeemAuwtForAmtsolDelayed} element={<RedeemAuwtForAmtsolDelayedPage />} />
            <Route path={Pathname.WithdrawAmtsolTicketAccount} element={<WithdrawAmtsolTicketAccountPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
