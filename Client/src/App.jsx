import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScanForm from './pages/ScanForm';

import axios from 'axios';
import Welcome from './pages/Welcome';
import Portfolio from './pages/Portfolio';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardUser/:userId" element={<ScanForm />} />
        <Route path="/card/:userId" element={<Welcome />} />
        <Route path='/cardInfo/:userId' element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;
