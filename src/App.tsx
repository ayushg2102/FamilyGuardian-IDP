import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequestsList from './pages/RequestsList';
import RequestDetail from './pages/RequestDetail';
import CreateRequest from './pages/CreateRequest';
import Profile from './pages/Profile';
import AppLayout from './components/AppLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import 'antd/dist/reset.css'; // AntD v5+ global styles
import SetPassword from './pages/SetPassword';
import { adminRoutes } from './routes/adminRoutes';

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
      <Router>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<SetPassword />} />
              <Route path="/set-password" element={<Navigate to="/reset-password" replace />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* Main app layout with protected routes */}
              <Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                {/* Regular user routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Admin dashboard with role protection */}
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']} redirectTo="/dashboard">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                {/* Include all admin routes */}
                {adminRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="/requests" element={<RequestsList />} />
                <Route path="/requests/:id" element={<RequestDetail />} />
                <Route path="/create-request" element={<CreateRequest />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
