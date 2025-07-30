import { RouteObject } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import MasterManagement from '../pages/admin/MasterManagement';
import AIConfigurator from '../pages/admin/AIConfigurator';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/users',
    element: <UserManagement />,
  },
  {
    path: '/admin/masters',
    element: <MasterManagement />,
  },
  {
    path: '/admin/ai-config',
    element: <AIConfigurator />,
  },
];

export default adminRoutes;
