import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScanForm from './pages/ScanForm';

import axios from 'axios';
import Welcome from './pages/Welcome';
import Portfolio from './pages/Portfolio';
import SignIn from './pages/SignIn';
import AccountCreation from './pages/AccountCreation';
import ConfirmationAccount from './pages/ConfirmationAccount'
import Confirmation from './pages/Confirmation';
import { LanguageProvider } from './LanguageContext';


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LanguageProvider>
              <Home />
            </LanguageProvider>} />
        <Route path="/cardUser/:userId" element={<ScanForm />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/register' element={<AccountCreation />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/card/:userId" element={<Welcome />} />
        <Route path='/cardInfo/:userId' element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;
