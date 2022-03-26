import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Homepage = React.lazy(() => import('@Pages/Homepage'));

function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
