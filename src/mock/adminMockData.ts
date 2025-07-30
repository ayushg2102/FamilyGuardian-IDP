import { SystemAlert } from '../pages/AdminDashboard';

export const systemAlerts: SystemAlert[] = [
  {
    id: 'SYS001',
    status: 'warning',
    title: 'High system load detected',
    date: '2025-07-23 14:30',
  },
  {
    id: 'SYS002',
    status: 'error',
    title: 'Database backup failed',
    date: '2025-07-23 13:15',
  },
  {
    id: 'SYS003',
    status: 'success',
    title: 'System updates completed',
    date: '2025-07-23 12:00',
  },
];

export const adminActions = [
  { action: 'User role updated', user: 'John Doe', timestamp: '2025-07-23 14:45' },
  { action: 'Master data updated', user: 'Admin', timestamp: '2025-07-23 13:30' },
  { action: 'AI rule modified', user: 'Admin', timestamp: '2025-07-23 12:15' },
  { action: 'New user added', user: 'Admin', timestamp: '2025-07-23 11:00' },
  { action: 'Password reset', user: 'Admin', timestamp: '2025-07-23 10:30' },
];

export const userStatusData = [
  { type: 'Active Users', value: 156 },
  { type: 'Inactive Users', value: 44 },
];

export const userRoleData = [
  { type: 'Admin', value: 8 },
  { type: 'Manager', value: 25 },
  { type: 'Approver', value: 42 },
  { type: 'User', value: 125 },
];

export const processAdminStats = (stats: any[]) => {
  return stats.map((stat) => ({
    ...stat,
    title: `Total ${stat.title}`,
    value: (parseInt(stat.value) * 2).toString(),
  }));
};

export const processAdminRequests = (requests: any[]) => {
  return requests.map((req) => ({
    ...req,
    initiator: `${req.initiator} (User)`,
  }));
};
