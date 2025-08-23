import React from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './pages/Home';
import InterviewPage from './pages/interview';
import ProtectingRoute from './pages/protectingRoute';
import "@tensorflow/tfjs";


function App() {
  return (
    <div className="min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={
            <ProtectingRoute>
              <HomePage />
            </ProtectingRoute>
          }/>
          <Route path="/interview/:topic" element={
            <ProtectingRoute>
              <InterviewPage />
            </ProtectingRoute>
          }/>
        </Routes>  
      </Router>
    </div>
  );
}

export default App;