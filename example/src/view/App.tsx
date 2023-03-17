import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Pathname } from '../entity';
import BuyCoverPage from './BuyCoverPage';
import Nav from './Nav';
import StakeSolForAuwtPage from './StakeSolForAuwtPage';

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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
