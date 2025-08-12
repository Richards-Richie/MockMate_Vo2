import React from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;