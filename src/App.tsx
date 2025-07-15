import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import RequestsList from './pages/RequestsList';
import RequestDetail from './pages/RequestDetail';
import CreateRequest from './pages/CreateRequest';
import Profile from './pages/Profile';
import AppLayout from './components/AppLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const theme = {
  token: {
    colorPrimary: '#00b894',
    colorInfo: '#00b894',
    colorSuccess: '#00b894',
    borderRadius: 6,
    colorBgContainer: '#ffffff',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/requests" element={<RequestsList />} />
              <Route path="/requests/:id" element={<RequestDetail />} />
              <Route path="/create-request" element={<CreateRequest />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;