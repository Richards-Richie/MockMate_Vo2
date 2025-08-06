import React from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/signup" element={<LandingPage />} />
        </Routes>  
      </Router>
    </div>
  );
}

export default App;