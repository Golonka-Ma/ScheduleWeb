import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<PrivateRoute><SchedulePage /></PrivateRoute>} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
</Routes>
    </Router>
  );
}

export default App;
