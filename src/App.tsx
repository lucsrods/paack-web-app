import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Curtain from '@Components/Curtain';

const Homepage = React.lazy(() => import('@Pages/Homepage'));
const DetailsPage = React.lazy(() => import('@Pages/DetailsPage'));

function App() {
  return (
    <Suspense fallback={<Curtain title="Loading..." />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/delivery/:id" element={<DetailsPage />} />
          <Route path="*" element={<Curtain title="404" />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
