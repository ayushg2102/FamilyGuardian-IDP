import React from 'react';
import { Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { dashboardStatsData, dashboardMyRequests, dashboardNotifications } from '../mock/mockData';
import { getStatusTag } from '../components/common/statusUtils.tsx';

const Dashboard: React.FC = () => {
  const statsData = dashboardStatsData;
  const myRequests = dashboardMyRequests;
  const notifications = dashboardNotifications;

  const navigate = useNavigate();

  return (
    <div style={{ background: '#f7fafc', minHeight: '100vh', padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 40px 0 40px', marginBottom: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 22, color: '#222' }}>Dashboard Overview</span>
        <Button
          type="primary"
          style={{ background: '#009688', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 15, height: 40, minWidth: 170 }}
          onClick={() => navigate('/create-request')}
        >
          Create New Request
        </Button>
      </div>
      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: 24, margin: '32px 40px 0 40px' }}>
        {statsData.map((stat, idx) => (
          <div key={idx} style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#888', fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{stat.title}</div>
              <div style={{ color: '#222', fontSize: 24, fontWeight: 700, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ color: '#222', fontSize: 13, fontWeight: 500 }}>{stat.amount}</div>
            </div>
            <div style={{ borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={stat.icon} alt="Document Icon" style={{ width: 36, height: 36 }} />
            </div>
          </div>
        ))}
      </div>
      {/* Main Content */}
      <div style={{ display: 'flex', gap: 24, margin: '32px 40px 0 40px' }}>
        {/* My Requests */}
        <div style={{ flex: 2, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', padding: 32, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>My Requests(10)</span>
            <Button
              style={{ border: '1px solid #009688', color: '#009688', borderRadius: 6, fontWeight: 500, fontSize: 15, height: 36, minWidth: 90, background: '#fff' }}
              onClick={() => navigate('/requests')}
            >
              View all
            </Button>
          </div>
          <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
            {myRequests.map((request, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #f0f0f0', padding: 24, marginBottom: 18, border: '1px solid #f2f2f2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span
                    style={{ color: '#009688', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                    onClick={() => navigate(`/requests/${request.id}`)}
                  >
                    {request.id}
                  </span>
                  <span style={{ color: '#888', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}><CalendarOutlined /> {request.date}</span>
                  {getStatusTag(request.status)}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 8 }}>
                  <div><span style={{ color: '#888', fontSize: 13 }}>Payment Type:</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{request.paymentType}</span></div>
                  <div><span style={{ color: '#888', fontSize: 13 }}>Entity:</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{request.entity}</span></div>
                  <div><span style={{ color: '#888', fontSize: 13 }}>Initiator:</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{request.initiator}</span></div>
                  <div><span style={{ color: '#888', fontSize: 13 }}>Amount:</span> <span style={{ fontWeight: 700, fontSize: 14 }}>{request.amount}</span></div>
                </div>
                {request.note && (
                  <div style={{ background: '#fff1f0', color: '#e14d43', borderRadius: 6, padding: '10px 16px', marginBottom: 8, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16 }}>⛔</span> {request.note}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    style={{ background: '#009688', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 15, height: 36, minWidth: 70 }}
                    onClick={() => navigate(`/requests/${request.id}`)}
                  >
                    {request.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Notification Panel */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e6e6e6', padding: 32, minWidth: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 16, display: 'block' }}>Notification Panel</span>
          <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 8 }}>
            {notifications.map((notification, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #f0f0f0', padding: 20, marginBottom: 18, border: '1px solid #f2f2f2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span
                    style={{ color: '#009688', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
                    onClick={() => navigate(`/requests/${notification.id}`)}
                  >
                    {notification.id}
                  </span>
                  {getStatusTag(notification.status)}
                </div>
                <div style={{ color: '#222', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                  {notification.bold && <span style={{ fontWeight: 700 }}>{notification.bold} </span>}
                  <span style={{ fontWeight: 400 }}>{notification.title.replace(notification.bold || '', '')}</span>
                </div>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>By: {notification.by}</div>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}><CalendarOutlined /> {notification.date}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    style={{ background: '#009688', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 15, height: 32, minWidth: 60 }}
                    onClick={() => navigate(`/requests/${notification.id}`)}
                  >
                    {notification.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;