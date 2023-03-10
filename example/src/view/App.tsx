import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Pathname } from '../entity';
import BuyCoverPage from './BuyCoverPage';

export function App() {
  return (
    <div>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Navigate to={Pathname.BuyCover} />} />
          <Route path={Pathname.BuyCover} element={<BuyCoverPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}
