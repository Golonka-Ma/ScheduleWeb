import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SchedulePage from './pages/SchedulePage';
import UserSettingsPage from './pages/UserSettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
  <div className={darkMode ? 'dark' : ''}>
      <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/settings" element={<PrivateRoute><UserSettingsPage /></PrivateRoute>} /> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;
