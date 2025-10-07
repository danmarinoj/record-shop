import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ByGenrePage from './pages/ByGenrePage';
import ByDecadePage from './pages/ByDecadePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:product_no" element={<ProductDetailsPage />} />
	<Route path="/genres/:genre" element={<ByGenrePage />} />
	<Route path="/decades/:decade" element={<ByDecadePage />} />
      </Routes>
    </Router>
  );
}

export default App;
