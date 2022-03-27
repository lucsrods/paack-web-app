import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loading from '@Components/Loading';

const Homepage = React.lazy(() => import('@Pages/Homepage'));
const DetailsPage = React.lazy(() => import('@Pages/DetailsPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/delivery/:id" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
